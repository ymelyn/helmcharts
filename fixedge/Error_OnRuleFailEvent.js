var fixMsg = getStringField(96);
parseMessage(fixMsg);

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

function toJSONError(error)
{
    var result = '{"Header":{';
    result = addJSONTag(result, "MsgType", "Internal_Error");
    result = addTagForInt(result, "RefSeqNum", getStringField(34));
    result = addJSONTag(result, "SendingTime", getStringField(52));
    result = addJSONTag(result, "OriginalSendingTime", getStringField(122));
    result = addTagWOComma(result, "SessionID", getStringField(56) + "-" + getStringField(49));

    result = result + '},"Body":{';
    result = result + '"' + "Error" + '":"' + error + '",';
    result = result + '"' + "OrigJsonMsg" + '":' + getStringField(213);
    result = result + "}}";

    return result;
}

function finalResult()
{   
    var errorJSON = toJSONError("An error occurred while executing the script");
    transform("FIX.4.4", "n");
    setStringField(212, errorJSON.length);
    setStringField(213, errorJSON);
	send("Kafka_Producer");
}

finalResult();
