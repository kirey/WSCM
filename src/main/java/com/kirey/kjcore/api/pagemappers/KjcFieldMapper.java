package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import com.kirey.kjcore.api.dto.ValidationErrorDto;

/**Custom mapper interface used for validation
*
*/
public interface KjcFieldMapper {
	
	/**A method that generates errors for given fields depending on validation errors occurred
	 * @param errors
	 * @return List<ValidationErrorDto> containing validation errors occurred
	 */
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors);
}
