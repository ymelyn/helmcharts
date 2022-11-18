function get_single_tag(tag_id)
{
    tag_value = getStringField(tag_id);
    if (!tag_value)
	{
		return null;
    }
    return tag_value;
}

//The same as addTag() but a value without quotes
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

function addTagForIntWOComma(str, tag, value)
{
    	// do not add empty tag into JSON
	if (!value || 0 === value.length)
	{
		return 	str;
	}
	// add tag into JSON
	return str + '"' + tag + '":' + value;
}
function addTag(str, tag, value)
{
	// do not add empty tag into JSON
	if (!value || 0 === value.length)
	{
		return 	str;
	}
	// add tag into JSON
	return str + '"' + tag + '":"' + value + '",';
}

//The same as addTag() but without a comma at the end
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

function getCancel_Replace_Request(tag)
{
    value = get_single_tag(tag);
    if (value == "1")
	{
		return "Order_Cancel_Request";
	}
    if (value == "2")
	{
		return "Cancel_Or_Replace_Request";
    }
    return null;
}

function getBuy_Sell(tag)
{
    value;
    aTag = get_single_tag(tag);

    switch(aTag)
    {
        case "1":
            value = "Buy";
            break;
        case "2":
            value = "Sell";
            break;
        case "5":
            value = "Short_Sell";
            break;
        default:
            value = null
    }

    return value;
}

function tag_102()
{
    value;

    switch(get_single_tag(102))
    {
        case "0":
            value = "Late_To_Cancel";
            break;
        case "1":
            value = "Unknown_Order";
            break;
        case "3":
            value = "Pending_For_Status";
            break;
        case "99":
            value = "Other";
            break;
        default:
            value = null
    }

    return value;
}

function getStatus(tag)
{
    value;

    switch(get_single_tag(tag))
    {
        case "0":
            value = "New";
            break;
        case "1":
            value = "Partially_Filled";
            break;
        case "2":
            value = "Filled";
            break;
        case "4":
            value = "Canceled";
            break;
        case "5":
            value = "Replaced";
            break;
        case "6":
            value = "Pending_Cancel";
            break;
        case "8":
            value = "Rejected";
            break;
        case "A":
            value = "Pending_New";
            break;
        case "C":
            value = "Expired";
            break;
        case "E":
            value = "Pending_Replace";
            break;
        case "X":
            value = "Partial_Cancel";
            break;
        case "F":
            value = "Trade";
            break;   
        default:
            value = null
    }

    return value;
}

function getMsgType(tag)
{
    value = get_single_tag(tag);
	if (value == "8")
	{
		return "Execution_Report";
	}
    if (value == "9")
	{
		return "Order_Cancel_Reject";
    }
    return null;
}

function getMarket_Limit(tag)
{
    value = get_single_tag(tag);
	if (value == "1")
	{
		return "Market";
	}
    if (value == "2")
	{
		return "Limit";
    }
    return null;
}

function tag_59()
{
    value = get_single_tag(59);
	if (value == "0")
	{
		return "Day";
	}
    if (value == "6")
	{
		return "GTD";
    }
    return null;
}

function tag_20001()
{
    value = get_single_tag(20001);
	if (value == "Y")
	{
		return "Outside_Of_Limits";
	}
    if (value == "N")
	{
		return "Will_Follow_Limit";
    }
    return null;
}

function toJSONHeader()
{
    var result = '{"Header":{';
    result = addTag(result, "MsgType", getMsgType(35));
    result = addTagForInt(result, "RefSeqNum", get_single_tag(34));
    result = addTag(result, "SendingTime", get_single_tag(52));
    result = addTag(result, "OriginalSendingTime", get_single_tag(122));
    result = addTagWOComma(result, "SessionID", get_single_tag(56) + "-" + get_single_tag(49));
    return result;
}

//35 = 9
function toJSON_9()
{
    var result = '},"Body":{';
    result = addTag(result, "ClOrdID", get_single_tag(11));
    result = addTag(result, "CxlRejResponseTo", getCancel_Replace_Request(434));
    result = addTag(result, "OrderID", get_single_tag(37));
    result = addTag(result, "OrdStatus", getStatus(39));
    result = addTag(result, "OrigClOrdID", get_single_tag(41));
    result = addTag(result, "Text", get_single_tag(58));
    result = addTag(result, "CxlRejReason", tag_102());
    result = addTagWOComma(result, "TransactTime", get_single_tag(60));

    result = result + "}}";
    return result;
}

//35 = 8
function toJSON_8()
{
    var result = '},"Body":{';
    result = addTag(result, "Account", get_single_tag(1));
    result = addTagForInt(result, "AvgPx", get_single_tag(6));
    result = addTag(result, "ClOrdID", get_single_tag(11));
    result = addTagForInt(result, "CumQty", get_single_tag(14));
    result = addTag(result, "ExecID", get_single_tag(17));
    result = addTagForInt(result, "LeavesQty", get_single_tag(151));
    result = addTag(result, "ExecType", getStatus(150));
    result = addTagForInt(result, "LastPx", get_single_tag(31));
    result = addTagForInt(result, "LastShares", get_single_tag(32));
    result = addTag(result, "OrderID", get_single_tag(37));
    result = addTagForInt(result, "OrderQty", get_single_tag(38));
    result = addTag(result, "OrdStatus", getStatus(39));
    result = addTag(result, "OrderType", getMarket_Limit(40));
    result = addTag(result, "OrigClOrdID", get_single_tag(41));
    result = addTagForInt(result, "Price", get_single_tag(44));
    result = addTag(result, "Side", getBuy_Sell(54));
    result = addTag(result, "Symbol", get_single_tag(55));
    result = addTag(result, "Text", get_single_tag(58));
    result = addTag(result, "TimeInForce", tag_59());
    result = addTag(result, "ExpireDate", get_single_tag(432));
    result = addTag(result, "ForceFlag", tag_20001());
    result = addTag(result, "AllocAcct", get_single_tag(30001));
    result = addTag(result, "ExternalClientID", get_single_tag(90008));
    result = addTagWOComma(result, "TransactTime", get_single_tag(60));

    result = result + "}}";
    return result;
}

function finalResult()
{
    var json = toJSONHeader();
    var MsgType = get_single_tag(35);

    if(MsgType == "9")
    {
        json = json + toJSON_9();
    }
    if(MsgType == "8")
    {
        json = json + toJSON_8();
    }

    transform("FIX.4.4", "n");
    setStringField(212, json.length);
    setStringField(213, json);
    print(json);
    send("Kafka_Producer");
}

finalResult();
