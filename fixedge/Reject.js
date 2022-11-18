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
function addTagWOCommaForInt(str, tag, value)
{
	// do not add empty tag into JSON
	if (!value || 0 === value.length)
	{
		return 	str;
	}
	// add tag into JSON
	return str + '"' + tag + '":' + value;
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

function tag_373()
{
    var value;

    switch(get_single_tag(373))
    {
        case "0":
            value = "Invalid_Tag_Number";
            break;
        case "1":
            value = "Required_Tag_Missing";
            break;
        case "2":
            value = "Tag_Not_Defined";
            break;
        case "3":
            value = "Undefined_Tag";
            break;
        case "4":
            value = "Tag_Without_Value";
            break;
        case "5":
            value = "Value_Incorrect";
            break;
        case "6":
            value = "Incorrect_Data_Format";
            break;
        case "7":
            value = "Decryption_Problem";
            break;
        case "8":
            value = "Signature_Problem";
            break;
        case "9":
            value = "CompID_Problem";
            break;
        case "10":
            value = "SendingTime_Accuracy_Problem";
            break;
        case "11":
            value = "Invalid_MsgType";
            break;
        case "12":
            value = "XML_Validation_Error";
            break;
        case "13":
            value = "More_Than_One_Tag";
            break;
        case "14":
            value = "Tag_Out_Of_Required_Order";
            break;
        case "15":
            value = "Repeating_Group_Out_Of_Order";
            break;
        case "16":
            value = "Incorrect_NumInGroup_Count";
            break;
        case "17":
            value = "No_SOH_Value";
            break; 
        case "99":
            value = "Other";
            break;   
        default:
            value = null
    }

    return value;
}

function getMsgType(tag)
{
    value = get_single_tag(tag);
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

function toJSONOrigHeader()
{
    var result = '{"Header":{';
    result = addTag(result, "MsgType", getMsgType(35));
    result = addTagWOComma(result, "SessionID", get_single_tag(49) + "-" + get_single_tag(56));
    return result;
}

function toJSONOrigBody(MsgType)
{
    var result = "Original message was not found";

    if(MsgType == "D")
    {
        result = '},"Body":{';
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
        return result;
    }
    if(MsgType == "F")
    {
        result = '},"Body":{';
        result = addTag(result, "ClOrdID", get_single_tag(11));
        result = addTag(result, "OrigClOrdID", get_single_tag(41));
        result = addTag(result, "OrderID", get_single_tag(37));
        result = addTag(result, "Side", getBuy_Sell(54));
        result = addTag(result, "Symbol", get_single_tag(55));
        result = addTagWOComma(result, "TransactTime", get_single_tag(60));
        result = result + "}}";
        return result;
    }
    if(MsgType == "G")
    {
        result = '},"Body":{';
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
        return result;
    }

    return result;
}

function getOrigMsg()
{
    var sender = getStringField(56);
    var target = getStringField(49);
    var refSeqNum = parseInt(getStringField(45));

    getMsgBySeqNum(sender, target, refSeqNum);
    
    var OrigJsonMsg = toJSONOrigHeader();
    
    OrigJsonMsg = OrigJsonMsg + toJSONOrigBody(getStringField(35));

    return OrigJsonMsg;
}

function toJSON_3()
{
    var result = '{"Header":{';
    result = addTag(result, "MsgType", "Reject");
    result = addTagForInt(result, "RefSeqNum", get_single_tag(34));
    result = addTag(result, "SendingTime", get_single_tag(52));
    result = addTag(result, "OriginalSendingTime", get_single_tag(122));
    result = addTagWOComma(result, "SessionID", get_single_tag(56) + "-" + get_single_tag(49));

    result = result + '},"Body":{';
    result = addTagForInt(result, "RefTagID", get_single_tag(371));
    result = addTag(result, "RefMsgType", get_single_tag(372));
    result = addTag(result, "SessionRejectReason", tag_373());
    result = addTag(result, "Text", get_single_tag(58));
    result = addTagForInt(result, "EncodedTextLen", get_single_tag(354));
    result = addTag(result, "EncodedText", get_single_tag(355));
    result = addTagForInt(result, "RefrSeqNum", get_single_tag(45));
    result = addTagWOCommaForInt(result, "OrigJsonMsg", getOrigMsg());

    result = result + "}}";
    return result;
}

function finalResult()
{   
    var json = toJSON_3();
    transform("FIX.4.4", "n");
    setStringField(212, json.length);
    setStringField(213, json);
    send("Kafka_Producer");
}

finalResult();
