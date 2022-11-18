function get_single_tag(tag_id)
{
    tag_value = getStringField(tag_id);
    if (!tag_value)
	{
		return null;
    }
    return tag_value;
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

function tag_380()
{
    var value;

    switch(get_single_tag(380))
    {
        case "0":
            value = "Other";
            break;
        case "1":
            value = "Unknown_ID";
            break;
        case "2":
            value = "Unknown_Security";
            break;
        case "3":
            value = "Unsupported_MsgType";
            break;
        case "4":
            value = "Application_Not_Available";
            break;
        case "5":
            value = "Field_Missing";
            break;
        case "6":
            value = "Not_Authorized";
            break;
        case "7":
            value = "DeliverTo_Not_Available";
            break;
        default:
            value = null
    }

    return value;
}

function toJSON_j()
{
    var result = '{"Header":{';
    result = addTag(result, "MsgType", "Business_Message_Reject");
    result = addTagForInt(result, "RefSeqNum", get_single_tag(34));
    result = addTag(result, "SendingTime", get_single_tag(52));
    result = addTag(result, "OriginalSendingTime", get_single_tag(122));
    result = addTagWOComma(result, "SessionID", get_single_tag(56) + "-" + get_single_tag(49));

    result = result + '},"Body":{';
    result = addTagForInt(result, "RefrSeqNum", get_single_tag(45));
    result = addTag(result, "RefMsgType", get_single_tag(372));
    result = addTag(result, "BusinessRejectID", get_single_tag(379));
    result = addTag(result, "Text", get_single_tag(58));
    result = addTagForInt(result, "EncodedTextLen", get_single_tag(354));
    result = addTag(result, "EncodedText", get_single_tag(355));
    result = addTagWOComma(result, "BusinessRejectReason", tag_380());

    result = result + "}}";
    return result;
}

function finalResult()
{   
    var json = toJSON_j();
    transform("FIX.4.4", "n");
    setStringField(212, json.length);
    setStringField(213, json);
    send("Kafka_Producer");
}

finalResult();
