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

function get_single_tag(tag_id)
{
    tag_value = getStringField(tag_id);
    if (!tag_value)
	{
		return null;
    }
    return tag_value;
}

function getMsgType(tag)
{
    var value = get_single_tag(tag);
	if (value == "D")
	{
		return "New_Order_Single";
	}
    if (value == "F")
	{
		return "Order_Cancel_Request";
    }
	if (value == "G")
	{
		return "Cancel_Or_Replace_Request";
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
	if (value == "3")
	{
		return "IOC";
	}
    if (value == "4")
	{
		return "FOK";
    }
    if (value == "6")
	{
		return "GTD";
    }
    return null;
}

function getBuy_Sell(tag)
{
    value;
    var aTag = get_single_tag(tag);

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

function getOrigJSON()
{
	var msgType = getMsgType(35);
	var result = '{"Header":{';
	result = addTag(result, "MsgType", msgType);
	result = addTagWOComma(result, "SessionID", getStringField(56) + "-" + getStringField(49));

	if (msgType == "New_Order_Single")
	{
		result = result + '},"Body":{';
    	result = addTag(result, "Account", get_single_tag(1));
    	result = addTag(result, "ClOrdID", get_single_tag(11));
    	result = addTag(result, "Handlist", "Automated_Private_Order");
    	result = addTagForInt(result, "OrderQty", get_single_tag(38));
    	result = addTag(result, "OrderType", getMarket_Limit(40));
    	result = addTagForInt(result, "Price", get_single_tag(44));
    	result = addTag(result, "Side", getBuy_Sell(54));
    	result = addTag(result, "Symbol", get_single_tag(55));
    	result = addTag(result, "TimeInForce", tag_59());
    	result = addTag(result, "ExpireDate", get_single_tag(432));
    	result = addTag(result, "ForceFlag", tag_20001());
    	result = addTag(result, "AllocAcct", get_single_tag(30001));
    	result = addTag(result, "ExternalClientID", get_single_tag(90008));
		result = addTagWOComma(result, "TransactTime", get_single_tag(60));
		result = result + "}}";
	}
    if (msgType == "Order_Cancel_Request")
	{
		result = result + '},"Body":{';
    	result = addTag(result, "ClOrdID", get_single_tag(11));
		result = addTag(result, "OrigClOrdID", get_single_tag(41));
		result = addTag(result, "OrderID", get_single_tag(37));
		result = addTag(result, "Side", getBuy_Sell(54));
		result = addTag(result, "Symbol", get_single_tag(55));
		result = addTagWOComma(result, "TransactTime", get_single_tag(60));
		result = result + "}}";
    }
    if (msgType == "Cancel_Or_Replace_Request")
	{
		result = result + '},"Body":{';
		result = addTag(result, "ClOrdID", get_single_tag(11));
		result = addTag(result, "OrigClOrdID", get_single_tag(41));
		result = addTag(result, "Handlist", "Automated_Private_Order");
		result = addTagForInt(result, "OrderQty", get_single_tag(38));
		result = addTag(result, "OrderType", getMarket_Limit(40));
		result = addTagForInt(result, "Price", get_single_tag(44));
		result = addTag(result, "OrderID", get_single_tag(37));
		result = addTag(result, "Side", getBuy_Sell(54));
		result = addTag(result, "Symbol", get_single_tag(55));
		result = addTag(result, "TimeInForce", tag_59());
		result = addTagWOComma(result, "TransactTime", get_single_tag(60));
		result = result + "}}";
    }

	return result;
}

function toJSONError(error)
{
    var result = '{"Header":{';
    result = addTag(result, "MsgType", "Internal_Error");
    result = addTagForInt(result, "RefSeqNum", getStringField(34));
    result = addTag(result, "SendingTime", getStringField(52));
    result = addTag(result, "OriginalSendingTime", getStringField(122));
    result = addTagWOComma(result, "SessionID", getStringField(56) + "-" + getStringField(49));

    result = result + '},"Body":{';
    result = result + '"' + "Error" + '":"' + error + '",';
	result = result + '"' + "RefJsonMsg" + '":' + getOrigJSON();
    result = result + "}}";

    return result;
}

function finalResult()
{   
    var errorJSON = toJSONError("Sending Error: An error occurred while sending the message");
    transform("FIX.4.4", "n");
	setStringField(212, errorJSON.length);
    setStringField(213, errorJSON);
	send("Kafka_Producer");
}

finalResult();
