package com.tremolosecurity.unison.scalejs;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.tremolosecurity.proxy.auth.AuthInfo;
import com.tremolosecurity.saml.Attribute;
import com.tremolosecurity.scalejs.sdk.UiDecisions;

public class ScaleJSUiHelper implements UiDecisions {

	@Override
	public void init(HashMap<String, Attribute> config) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean canEditUser(AuthInfo user, HttpServletRequest request) {
		return false;
	}

	@Override
	public Set<String> availableAttributes(AuthInfo user, HttpServletRequest request) {
		
		HashSet<String> ret = new HashSet<String>();
		for (String name : user.getAttribs().keySet()) {
			ret.add(name);
		}
		
		return ret;
	}

	@Override
	public boolean canRequestForOthers(String workflowName, AuthInfo user, HttpServletRequest request) {
		return true;
	}

	@Override
	public boolean canPreApprove(String workflowName, AuthInfo user, HttpServletRequest request) {
		return true;
	}

}
