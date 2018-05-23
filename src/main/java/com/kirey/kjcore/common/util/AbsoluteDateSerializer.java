package com.kirey.kjcore.common.util;

import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * @author nicutac
 *         <p>
 *         Class used for serialization and adjustment of date fields in order
 *         to obtain absolute date.
 *         <p>
 *         It is automatically called if we
 *         use @JsonSerialize(using=AbsoluteDateSerializer.class) on desired
 *         field.
 */
public class AbsoluteDateSerializer extends JsonSerializer<Date> {

	@Override
	public void serialize(Date date, JsonGenerator generator, SerializerProvider provider) {
		try {
			Long absoluteTimeStamp = date.getTime();
			generator.writeNumber(Utilities.convertOutgoingAbsoluteDate(absoluteTimeStamp).getTime());

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}