//    Copyright 2018 Tremolo Security, Inc.
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package com.tremolosecurity.unison.k8s.tasks;

import java.util.Map;

import com.tremolosecurity.provisioning.core.ProvisioningException;
import com.tremolosecurity.provisioning.core.User;
import com.tremolosecurity.provisioning.core.UserStoreProviderWithAddGroup;
import com.tremolosecurity.provisioning.core.WorkflowTask;
import com.tremolosecurity.provisioning.util.CustomTask;
import com.tremolosecurity.saml.Attribute;
import com.tremolosecurity.server.GlobalEntries;

import org.apache.log4j.Logger;

/**
 * DoesGroupExist
 */
public class DoesGroupExist implements CustomTask {

    static Logger logger = Logger.getLogger(DoesGroupExist.class);

    String target;
    String groupName;
    String attributeName;

    transient WorkflowTask task;

    @Override
    public boolean doTask(User user, Map<String, Object> request) throws ProvisioningException {
        logger.info("task : " + this.task  + " / " + this);
        String localGroupName = task.renderTemplate(groupName, request);
        UserStoreProviderWithAddGroup provTarget = (UserStoreProviderWithAddGroup) GlobalEntries.getGlobalEntries().getConfigManager().getProvisioningEngine().getTarget(this.target).getProvider();
        if (provTarget.isGroupExists(localGroupName, user, request)) {
            user.getAttribs().put(this.attributeName, new Attribute(this.attributeName,"true"));
        } else {
            user.getAttribs().put(this.attributeName, new Attribute(this.attributeName,"false"));
        }

        return true;
    }

    @Override
    public void init(WorkflowTask task, Map<String, Attribute> config) throws ProvisioningException {
        this.target = config.get("target").getValues().get(0);
        this.groupName = config.get("groupName").getValues().get(0);
        this.attributeName = config.get("attributeName").getValues().get(0);
        this.task = task;
        logger.info("init : " + task + " / " + this);
	}

	@Override
	public void reInit(WorkflowTask task) throws ProvisioningException {
        this.task = task;
        logger.info("reInit : " + task + " / " + this);
	}

    
}