var jsonMsgStr = getStringField(213);
var msg, SessionID;

msg = JSON.parse(jsonMsgStr);
SessionID = msg.Header.SessionID;
var target = SessionID.split('-').pop();
var sender = SessionID.split('-')[0];

function addJSONTag(str, tag, value)
{
	// do not add empty tag into JSON
	if (!value || 0 === value.length)
	{
		return 	str;
	}
	// add tag into JSON
	return str + '"' + tag + '":"' + value + '",';
}

//The same as addJSONTag() but a value without quotes
function addTagForInt(str, tag, value)
{
    // do not add empty tag into JSON
	if (!value || 0 === value.length)
	{
		return 	str;
	}
	// add tag into JSON
	return str + '"' + tag + '":' + value + ',';
}

//The same as addJSONTag() but without a comma at the end
function addTagWOComma(str, tag, value)
{
	// do not add empty tag into JSON
	if (!value || 0 === value.length)
	{
		return 	str;
	}
	// add tag into JSON
	return str + '"' + tag + '":"' + value + '"';
}

function tranformMsgTypeAndForm()
{
    var msgType = msg.Header.MsgType;
    if(msgType == "New_Order_Single")
    {
        transform("FIX.4.4", "D");
        toFIX_D();
    }
    if(msgType == "Order_Cancel_Request")
    {
        transform("FIX.4.4", "F");
        toFIX_F();
    }
    if(msgType == "Cancel_Or_Replace_Request")
    {
        transform("FIX.4.4", "G");
        toFIX_G();
    }
    if(msgType+"" == "undefined")
    {
        throw "MsgType is null";
    }
    send(sender,target);
}

function getMarket_Limit(value)
{
	if (value == "Market")
	{
		return "1";
	}
    if (value == "Limit")
	{
		return "2";
    }
    return null;
}

function getBuy_Sell(tag)
{
    var value = "";

    switch(tag)
    {
        case "Buy":
            value = "1";
            break;
        case "Sell":
            value = "2";
            break;
        case "Short_Sell":
            value = "5";
            break;
        default:
            value = null
    }

    return value;
}

function tag_59(tag)
{
    var value = "";

    switch(tag)
    {
        case "Day":
            value = "0";
            break;
        case "IOC":
            value = "3";
            break;
        case "FOK":
            value = "4";
            break;   
        case "GTD":
            value = "6";
            break;
        default:
            value = null
    }

    return value;
}

function tag_20001(value)
{
	if (value == "Outside_Of_Limits")
	{
		return "Y";
	}
    if (value == "Will_Follow_Limit")
	{
		return "N";
    }
    return null;
}

function addTag(key, value)
{
    if(value == null)
    {
        return null;
    }

    setStringField(key, value+"");
}

function toFIX_D()
{
    addTag(1, msg.Body.Account);
    addTag(11, msg.Body.ClOrdID);
    addTag(21, "1");
    addTag(38, msg.Body.OrderQty);
    addTag(40, getMarket_Limit(msg.Body.OrderType));
    addTag(44, msg.Body.Price);
    addTag(54, getBuy_Sell(msg.Body.Side));
    addTag(55, msg.Body.Symbol);
    addTag(59, tag_59(msg.Body.TimeInForce));
    addTag(60, msg.Body.TransactTime);
    addTag(432, msg.Body.ExpireDate);
    addTag(20001, tag_20001(msg.Body.ForceFlag));
    addTag(30001, msg.Body.AllocAcct);
    addTag(90008, msg.Body.ExternalClientID);
}

function toFIX_F()
{
    addTag(11, msg.Body.ClOrdID);
    addTag(41, msg.Body.OrigClOrdID);
    addTag(37, msg.Body.OrderID);
    addTag(55, msg.Body.Symbol);
    addTag(54, getBuy_Sell(msg.Body.Side));
    addTag(60, msg.Body.TransactTime);
}

function toFIX_G()
{
    addTag(11, msg.Body.ClOrdID);
    addTag(41, msg.Body.OrigClOrdID);
    addTag(21, "1");
    addTag(38, msg.Body.OrderQty);
    addTag(44, msg.Body.Price);
    addTag(40, getMarket_Limit(msg.Body.OrderType));
    addTag(37, msg.Body.OrderID);
    addTag(54, getBuy_Sell(msg.Body.Side));
    addTag(55, msg.Body.Symbol);
    addTag(59, tag_59(msg.Body.TimeInForce));
    addTag(60, msg.Body.TransactTime);
}

tranformMsgTypeAndForm();
