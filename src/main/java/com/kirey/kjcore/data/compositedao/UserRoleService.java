package com.kirey.kjcore.data.compositedao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcApplicationRolesDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;

@Service
public class UserRoleService {

	@Autowired
	private KjcApplicationRolesDao kjcApplicationRolesDao;

	/**
	 * This method is used for retrieving KjcApplicationRoles depends on role of user in context
	 * @return @List of KjcApplicationRoles
	 */
	public List<KjcApplicationRoles> findFilteredRole() {
		List<KjcApplicationRoles> roleList = kjcApplicationRolesDao.findAll();
		List<KjcApplicationRoles> filteredList = new ArrayList<>();
		if(Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN)){
			filteredList.addAll(roleList);
		}
		if(Utilities.isRole(AppConstants.ROLE_ADMIN) || Utilities.isRole(AppConstants.ROLE_SUBADMIN)) {
			filteredList.addAll(roleList);
			for (KjcApplicationRoles kjcApplicationRoles : roleList) {
				
				if(kjcApplicationRoles.getName().equals(AppConstants.ROLE_SUPER_ADMIN)){
					filteredList.remove(kjcApplicationRoles);
				}
			}
		}

		return filteredList;
	}
	
	/**
	 * This method is used for retrieving role names depends on role of user in context
	 * @return @List of role names
	 */
	public List<String> findFilteredRoleNames() {
	List<KjcApplicationRoles> listRoles = this.findFilteredRole();
	List<String> listRoleNames = new ArrayList<>();
	for (KjcApplicationRoles kjcApplicationRoles : listRoles) {
		listRoleNames.add(kjcApplicationRoles.getName());
	}
	return listRoleNames;
	}
	
	
}
