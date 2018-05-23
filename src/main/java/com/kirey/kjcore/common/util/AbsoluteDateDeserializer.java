package com.kirey.kjcore.common.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.ibm.icu.text.SimpleDateFormat;

/**
 * @author nicutac
 *         <p>
 *         Class used for deserialization and adjustment of date fields in order
 *         to obtain absolute date.
 *         <p>
 *         It is automatically called if we
 *         use @JsonDeserialize(using=AbsoluteDateDeserializer.class) on desired
 *         field.
 */
public class AbsoluteDateDeserializer extends JsonDeserializer<Date> {

	@Autowired
	private PrintingToConsole printer;

	@Override
	public Date deserialize(JsonParser jsonparser, DeserializationContext deserializationcontext) {
		Date result = null;
		try {

			printer.printMessage(this.getClass(), this.getClass().getName() + ": Begin deserialize()");

			if (jsonparser.getText() != null && !"".equals(jsonparser.getText())) {
				if (jsonparser.getText().matches("-?[0-9]+")) {
			
					result = Utilities.convertIncomingAbsoluteDate(Long.valueOf(jsonparser.getText()));
				} else {
					
					SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

					Date serverDate = f.parse(jsonparser.getText());
	
					result = Utilities.convertIncomingAbsoluteDate(serverDate.getTime());

				}
			}

		} catch (Throwable e) {
			throw new RuntimeException(e);
		}
		printer.printMessage(this.getClass(), this.getClass().getName() + ": End deserialize()");
		return result;
	}
}
