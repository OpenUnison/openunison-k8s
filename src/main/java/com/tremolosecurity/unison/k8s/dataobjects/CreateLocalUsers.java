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

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.cfgxml.spi.LoadedConfig;
import org.hibernate.boot.jaxb.cfg.spi.JaxbCfgHibernateConfiguration;
import org.hibernate.boot.jaxb.cfg.spi.JaxbCfgMappingReferenceType;
import org.hibernate.boot.jaxb.cfg.spi.JaxbCfgHibernateConfiguration.JaxbCfgSessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import com.novell.ldap.LDAPConstraints;
import com.novell.ldap.LDAPException;
import com.novell.ldap.LDAPModification;
import com.novell.ldap.LDAPSearchConstraints;
import com.tremolosecurity.provisioning.objects.AuditLogType;

import net.sourceforge.myvd.chain.AddInterceptorChain;
import net.sourceforge.myvd.chain.BindInterceptorChain;
import net.sourceforge.myvd.chain.CompareInterceptorChain;
import net.sourceforge.myvd.chain.DeleteInterceptorChain;
import net.sourceforge.myvd.chain.ExetendedOperationInterceptorChain;
import net.sourceforge.myvd.chain.ModifyInterceptorChain;
import net.sourceforge.myvd.chain.PostSearchCompleteInterceptorChain;
import net.sourceforge.myvd.chain.PostSearchEntryInterceptorChain;
import net.sourceforge.myvd.chain.RenameInterceptorChain;
import net.sourceforge.myvd.chain.SearchInterceptorChain;
import net.sourceforge.myvd.core.NameSpace;
import net.sourceforge.myvd.inserts.Insert;
import net.sourceforge.myvd.types.Attribute;
import net.sourceforge.myvd.types.Bool;
import net.sourceforge.myvd.types.DistinguishedName;
import net.sourceforge.myvd.types.Entry;
import net.sourceforge.myvd.types.ExtendedOperation;
import net.sourceforge.myvd.types.Filter;
import net.sourceforge.myvd.types.Int;
import net.sourceforge.myvd.types.Password;
import net.sourceforge.myvd.types.Results;

public class CreateLocalUsers implements Insert {

	String name;

	@Override
	public String getName() {
		return name;
	}

	@Override
	public void configure(String name, Properties props, NameSpace nameSpace) throws LDAPException {
		StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder();

		Configuration config = new Configuration();
		config.setProperty("hibernate.connection.driver_class", props.getProperty("driver"));
		config.setProperty("hibernate.connection.password", props.getProperty("password"));
		config.setProperty("hibernate.connection.url", props.getProperty("url"));
		config.setProperty("hibernate.connection.username", props.getProperty("user"));
		config.setProperty("hibernate.dialect", props.getProperty("dialect"));
		config.setProperty("hibernate.hbm2ddl.auto", "update");
		config.setProperty("show_sql", "true");
		config.setProperty("hibernate.current_session_context_class", "thread");

		config.setProperty("hibernate.c3p0.max_size", Integer.toString(10));
		config.setProperty("hibernate.c3p0.maxIdleTimeExcessConnections", Integer.toString(10));

		JaxbCfgHibernateConfiguration jaxbCfg = new JaxbCfgHibernateConfiguration();
		jaxbCfg.setSessionFactory(new JaxbCfgSessionFactory());

		JaxbCfgMappingReferenceType mrt = new JaxbCfgMappingReferenceType();
		mrt.setClazz(LocalUser.class.getName());
		jaxbCfg.getSessionFactory().getMapping().add(mrt);

		mrt = new JaxbCfgMappingReferenceType();
		mrt.setClazz(LocalGroup.class.getName());
		jaxbCfg.getSessionFactory().getMapping().add(mrt);

		LoadedConfig lc = LoadedConfig.consume(jaxbCfg);
		StandardServiceRegistry registry = builder.configure(lc).applySettings(config.getProperties()).build();
		SessionFactory sessionFactory = new MetadataSources( registry ).buildMetadata().buildSessionFactory();

		Session session = sessionFactory.openSession();

		List<LocalGroup> groups = session.createCriteria(LocalGroup.class).list();
		if (groups.size() == 0) {
			session.beginTransaction();
			LocalGroup admins = new LocalGroup();
			admins.setName("administrators");
			admins.setDescription("System administrators with approval access for new projects and new cluster admins");
			session.save(admins);

			LocalGroup k8sAdmins = new LocalGroup();
			k8sAdmins.setName("k8s-cluster-administrators");
			k8sAdmins.setDescription("Kubernetes cluster administrators");
			session.save(k8sAdmins);

			LocalGroup sys = new LocalGroup();
			sys.setName("System");
			sys.setDescription("System level groups not assigned to local users");
			session.save(sys);

			LocalGroup users = new LocalGroup();
			users.setName("users");
			users.setDescription("All users are members");
			session.save(users);

			LocalUser sysUser = new LocalUser();
			sysUser.setSub("system");
			sysUser.setMail("");
			sysUser.setGroups(new ArrayList<LocalGroup>());
			sysUser.getGroups().add(sys);
			session.save(sysUser);

			session.getTransaction().commit();
		}

		sessionFactory.close();

	}

	@Override
	public void add(AddInterceptorChain chain, Entry entry, LDAPConstraints constraints) throws LDAPException {
		chain.nextAdd(entry, constraints);

	}

	@Override
	public void bind(BindInterceptorChain chain, DistinguishedName dn, Password pwd, LDAPConstraints constraints)
			throws LDAPException {
		chain.nextBind(dn, pwd, constraints);

	}

	@Override
	public void compare(CompareInterceptorChain chain, DistinguishedName dn, Attribute attrib,
			LDAPConstraints constraints) throws LDAPException {
		chain.nextCompare(dn, attrib, constraints);

	}

	@Override
	public void delete(DeleteInterceptorChain chain, DistinguishedName dn, LDAPConstraints constraints)
			throws LDAPException {
		chain.nextDelete(dn, constraints);

	}

	@Override
	public void extendedOperation(ExetendedOperationInterceptorChain chain, ExtendedOperation op,
			LDAPConstraints constraints) throws LDAPException {
		chain.nextExtendedOperations(op, constraints);

	}

	@Override
	public void modify(ModifyInterceptorChain chain, DistinguishedName dn, ArrayList<LDAPModification> mods,
			LDAPConstraints constraints) throws LDAPException {
		// TODO Auto-generated method stub

	}

	@Override
	public void search(SearchInterceptorChain chain, DistinguishedName base, Int scope, Filter filter,
			ArrayList<Attribute> attributes, Bool typesOnly, Results results, LDAPSearchConstraints constraints)
			throws LDAPException {
		chain.nextSearch(base, scope, filter, attributes, typesOnly, results, constraints);

	}

	@Override
	public void rename(RenameInterceptorChain chain, DistinguishedName dn, DistinguishedName newRdn, Bool deleteOldRdn,
			LDAPConstraints constraints) throws LDAPException {
		chain.nextRename(dn, newRdn, deleteOldRdn, constraints);

	}

	@Override
	public void rename(RenameInterceptorChain chain, DistinguishedName dn, DistinguishedName newRdn,
			DistinguishedName newParentDN, Bool deleteOldRdn, LDAPConstraints constraints) throws LDAPException {
		chain.nextRename(dn, newRdn, newParentDN, deleteOldRdn, constraints);

	}

	@Override
	public void postSearchEntry(PostSearchEntryInterceptorChain chain, Entry entry, DistinguishedName base, Int scope,
			Filter filter, ArrayList<Attribute> attributes, Bool typesOnly, LDAPSearchConstraints constraints)
			throws LDAPException {
		chain.nextPostSearchEntry(entry, base, scope, filter, attributes, typesOnly, constraints);

	}

	@Override
	public void postSearchComplete(PostSearchCompleteInterceptorChain chain, DistinguishedName base, Int scope,
			Filter filter, ArrayList<Attribute> attributes, Bool typesOnly, LDAPSearchConstraints constraints)
			throws LDAPException {
		chain.nextPostSearchComplete(base, scope, filter, attributes, typesOnly, constraints);

	}

	@Override
	public void shutdown() {


	}

}
