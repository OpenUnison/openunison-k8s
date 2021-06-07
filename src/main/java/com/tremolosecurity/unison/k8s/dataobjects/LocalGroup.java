/*******************************************************************************
 * Copyright 2016 Tremolo Security, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package com.tremolosecurity.unison.k8s.dataobjects;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "localGroups")
public class LocalGroup {
	int groupId;
	String name;
	String description;
	List<LocalUser> users;

	public LocalGroup() {

	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "groupId", unique = true, nullable = false)
	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int id) {
		this.groupId = id;
	}

	@Column(name = "name", nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "description", nullable = true,columnDefinition = "TEXT")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "userGroups",  joinColumns = {
			@JoinColumn(name = "groupId", nullable = false, updatable = false) },
			inverseJoinColumns = { @JoinColumn(name = "userId",
					nullable = false, updatable = false) })
	public List<LocalUser> getUsers() {
		return users;
	}

	public void setUsers(List<LocalUser> users) {
		this.users = users;
	}


}
