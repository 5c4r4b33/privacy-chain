const Cu = Components.utils;
Cu.import("resource:///modules/gloda/mimemsg.js");

var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var strbundle;

myStateListener = {
  init: function(e) {
	gMsgCompose.RegisterStateListener(myStateListener);
  },

  NotifyComposeFieldsReady: function() {
  },

  NotifyComposeBodyReady: function() {
	var origURI = gMsgCompose.originalMsgURI;
        var messenger = Components.classes["@mozilla.org/messenger;1"].createInstance(Components.interfaces.nsIMessenger);
        var msgHdr = messenger.msgHdrFromURI(origURI);

	strbundle = document.getElementById("strings");
	var firstlstr = strbundle.getString("firstl");
	var secondlstr = strbundle.getString("secondl");
	var thirdlstr = strbundle.getString("thirdl");
	var fourthlstr = strbundle.getString("fourthl");
	var fifthlstr = strbundle.getString("fifthl");
	var sixthlstr = strbundle.getString("sixthl");
	var seventhlstr = strbundle.getString("seventhl");
	var eighthlstr = strbundle.getString("eighthl");
	var ninthlstr = strbundle.getString("ninthl");
	var tenthlstr = strbundle.getString("tenthl");
	var eleventhlstr = strbundle.getString("eleventhl");
	var twelfthlstr = strbundle.getString("twelfthl");
	var thirteenthlstr = strbundle.getString("thirteenthl");
	var fourteenthlstr = strbundle.getString("fourteenthl");
	var fifteenthlstr = strbundle.getString("fifteenthl");
	var sixteenthlstr = strbundle.getString("sixteenthl");
	var seventeenthlstr = strbundle.getString("seventeenthl");
	var eighteenthlstr = strbundle.getString("eighteenthl");
	var nineteenthlstr = strbundle.getString("nineteenthl");
	var twentiethlstr = strbundle.getString("twentiethl");
	var twentyfirstlstr = strbundle.getString("twentyfirstl");
	var twentysecondlstr = strbundle.getString("twentysecondl");

	// function defined in mimemsg.js returns a MimeMessage, to parse the message into a Mime tree
	MsgHdrToMimeMessage(msgHdr, null, function(aMsgHdr, aMimeMsg)
	{
	   try {

	    // to differentiate between encrypted and not encrypted emails
	    if (aMimeMsg.headers['content-type'])
	      var conttp = String(aMimeMsg.headers['content-type']);

	   // getting the version of MIME used
	   if (aMimeMsg.headers['mime-version'])
	     var mimevers = String(aMimeMsg.headers['mime-version']);

	   // to specify the number of relays that the message has gone through
	   var rec = String(aMimeMsg.headers['received']);
	   var received = rec.split(';');
	   var man = received.length - 1;

	   // getting the user agent header field, which depending on whether it is TB or any other, is found in 'user-agent' and 'x-mailer'
	   if (aMimeMsg.headers['user-agent'])
	     var ua1 = aMimeMsg.headers['user-agent'];
	   if (aMimeMsg.headers['x-mailer'])
	     var ua2 = aMimeMsg.headers['x-mailer'];

	   // getting the number of messages in the same conversation
	   var ref = String(aMimeMsg.headers['references']);
	   var rr = ref.split("> <").length + 2;

	   // starting to manipulate the signature
	   var editor = GetCurrentEditor();
	   var editor_type = GetCurrentEditorType();
	   editor.beginTransaction();
	   editor.beginningOfDocument();

	   // we need to insert the cursor before the signature; by default it comes after
	   var sr = editor.selection.getRangeAt(0).cloneRange(); //old cursor
           var range = editor.document.createRange(); //new cursor

	   if( editor_type == "textmail" || editor_type == "text" ) {
		    editor.insertText( "___________________________________________________________________________________________________________" );
		    editor.insertLineBreak();
		    editor.insertText(firstlstr + " ");
                    if (ref == 'undefined')
                        editor.insertText(secondlstr + " ");
                    else
                    {
			editor.insertText( rr );
			if (rr == 3)
				editor.insertText(thirdlstr);
			else if (rr == 4)
				editor.insertText(fourthlstr);
			else if (rr == 5)
				editor.insertText(fifthlstr);
			else if (rr == 6)
				editor.insertText(sixthlstr);
			else if (rr == 7)
				editor.insertText(seventhlstr);
			else if (rr == 8)
				editor.insertText(eighthlstr);
			else if (rr == 9)
				editor.insertText(ninthlstr);
			else if (rr == 10)
				editor.insertText(tenthlstr);
			else if (rr == 21 || rr == 31 || rr == 41 || rr == 51)
				editor.insertText(eleventhlstr);
			else if (rr == 22 || rr == 32 || rr == 42 || rr == 52)
				editor.insertText(twelfthlstr);
			else if (rr == 23 || rr == 33 || rr == 43 || rr == 53)
				editor.insertText(thirteenthlstr);
                        else
                                editor.insertText(fourteenthlstr);
                    }
                    editor.insertText(" " + fifteenthlstr);

		    if (ua1 != null) {
                      editor.insertText(" " + sixteenthlstr + " ");
                      editor.insertText( ua1 );
                      editor.insertText(" " + seventeenthlstr + " ");
                    }
                    else if (ua2 != null) {
                      editor.insertText(" " + sixteenthlstr + " ");
                      editor.insertText( ua2 );
                      editor.insertText(" " + seventeenthlstr + " ");
                    }

		    if (man > 0)
		    {
		    	editor.insertText(eighteenthlstr + " ");
		    	editor.insertText( man );
		    	editor.insertText(" " + nineteenthlstr + " ");
		    }

		    if (mimevers != null)
		    {
			editor.insertText(" " + twentiethlstr + " ");
			editor.insertText( mimevers );
			editor.insertText(".");
		    }

		    if (conttp != null)
		    {
        	        if (!conttp.match("encrypt"))
                    	  editor.insertText(" " + twentyfirstlstr + " ");
			else
	  		  if (conttp.match("pgp"))
			    editor.insertText(" " + twentysecondlstr);
		    }
		    editor.insertLineBreak();
                    editor.insertText( "___________________________________________________________________________________________________________" );

                } else {

                    editor.insertHTML( "<p>___________________________________________________________________________________________________________<p>" );
		    editor.insertHTML(firstlstr.toString() + " ");
                    if (ref == 'undefined')
                        editor.insertHTML(secondlstr);
                    else
                    {
                        editor.insertHTML( rr );
			if (rr == 3)
                                editor.insertHTML(thirdlstr);
                        else if (rr == 4)
                                editor.insertHTML(fourthlstr);
                        else if (rr == 5)
                                editor.insertHTML(fifthlstr);
                        else if (rr == 6)
                                editor.insertHTML(sixthlstr);
                        else if (rr == 7)
                                editor.insertHTML(seventhlstr);
                        else if (rr == 8)
                                editor.insertHTML(eighthlstr);
                        else if (rr == 9)
                                editor.insertHTML(ninthlstr);
                        else if (rr == 10)
                                editor.insertHTML(tenthlstr);
                        else if (rr == 21 || rr == 31 || rr == 41 || rr == 51)
                                editor.insertHTML(eleventhlstr);
                        else if (rr == 22 || rr == 32 || rr == 42 || rr == 52)
                                editor.insertHTML(twelfthlstr);
                        else if (rr == 23 || rr == 33 || rr == 43 || rr == 53)
                                editor.insertHTML(thirteenthlstr);
                        else
                                editor.insertHTML(fourteenthlstr);
                    }
                    editor.insertHTML(" " + fifteenthlstr + " ");

		    if (ua1 != null) {
                      editor.insertHTML("<p>" + sixteenthlstr + " ");
                      editor.insertHTML( ua1.toString() );
                      editor.insertHTML(" " + seventeenthlstr + " ");
                    }
                    else if (ua2 != null) {
                         editor.insertHTML("<p>" + sixteenthlstr + " ");
                         editor.insertHTML( ua2.toString() );
                         editor.insertHTML(" " + seventeenthlstr + " ");
                    }

		    if (man > 0)
                    {
		    	editor.insertHTML("<p>" + eighteenthlstr + " ");
		    	editor.insertHTML(man.toString());
		    	editor.insertHTML(" " + nineteenthlstr + " ");
		    }

		    if (mimevers != null)
		    {
                        editor.insertHTML("<p>" + twentiethlstr + " ");
                        editor.insertHTML( mimevers.toString() );
			editor.insertHTML( "." );
                    }

		    if (conttp != null)
		    {
                        if (!conttp.match("encrypt"))
                          editor.insertHTML("<p>" + twentyfirstlstr);
			else
                          if (conttp.match("pgp"))
                            editor.insertHTML("<p>" + twentysecondlstr);
		    }
                    editor.insertHTML( "<p>___________________________________________________________________________________________________________<p>" );
		}
		range.setStart(sr.startContainer, editor.selection.focusNode.textContent.length);
                range.setEnd(sr.startContainer, editor.selection.focusNode.textContent.length);
                editor.selection.removeAllRanges();
                editor.selection.addRange(range);
		editor.endTransaction();
	   }
           catch (err) {
                Components.utils.reportError(err);
                return false;
           }
        }, true);
  },

  ComposeProcessDone: function(aResult) {
  },

  SaveInFolderDone: function(folderURI) {
  } 
};

window.addEventListener("compose-window-init", myStateListener.init,true);
