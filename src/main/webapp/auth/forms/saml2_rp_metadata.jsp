<%@ page language="java" contentType="text/xml; charset=UTF-8"
    pageEncoding="UTF-8" import="com.tremolosecurity.server.*,com.tremolosecurity.config.util.*,com.tremolosecurity.config.xml.*,org.opensaml.core.config.*,java.security.*,org.apache.commons.codec.binary.*,org.opensaml.saml.saml2.metadata.impl.*,java.util.*,org.opensaml.saml.saml2.metadata.*,java.security.cert.*,org.opensaml.security.credential.*,org.opensaml.xmlsec.signature.impl.*,org.opensaml.xmlsec.signature.support.*,org.opensaml.xmlsec.signature.*,org.opensaml.xmlsec.signature.impl.*,java.security.cert.*,org.w3c.dom.Element"%><%

    
    
String mechanismName = "saml2";
String chainName = "enterprise-idp";

TremoloType tt = GlobalEntries.getGlobalEntries().getConfigManager().getCfg();

MechanismType saml2Mech = null;

for (MechanismType mechType : tt.getAuthMechs().getMechanism()) {
	if (mechType.getName().equalsIgnoreCase(mechanismName)) {
		saml2Mech = mechType;
		
	}
}

AuthChainType act = null;

System.out.println("searching for '" + chainName + "'");
for (AuthChainType lact : tt.getAuthChains().getChain()) {
	System.out.println(lact.getName());
	if (lact.getName().equalsIgnoreCase(chainName)) {
		act = lact;
	}
}

AuthMechType currentMechanism = null;
for (AuthMechType amt : act.getAuthMech()) {
	if (amt.getName().equalsIgnoreCase(mechanismName)) {
		currentMechanism = amt;
		break;
	}
}

InitializationService.initialize();

String urlBase = request.getRequestURL().toString();
urlBase = urlBase.substring(0,urlBase.indexOf('/',9));

ConfigManager cfg = GlobalEntries.getGlobalEntries().getConfigManager();

String url = urlBase + saml2Mech.getUri();

SecureRandom random = new SecureRandom();
byte[] idBytes = new byte[20];
random.nextBytes(idBytes);


String id = "f" + Hex.encodeHexString(idBytes);

EntityDescriptorBuilder edb = new EntityDescriptorBuilder();
EntityDescriptorImpl ed = (EntityDescriptorImpl) edb.buildObject();
ed.setID(id);
ed.setEntityID(url);


SPSSODescriptorBuilder spb = new SPSSODescriptorBuilder();
SPSSODescriptorImpl sp = (SPSSODescriptorImpl) spb.buildObject();
ed.getRoleDescriptors().add(sp);

HashMap<String,ParamType> params = new HashMap<String,ParamType>();
for (ParamType pt : currentMechanism.getParams().getParam()) {
	params.put(pt.getName(), pt);
}

boolean assertionsSigned = params.get("assertionsSigned") != null && params.get("assertionsSigned").getValue().equalsIgnoreCase("true");
sp.setWantAssertionsSigned(assertionsSigned);
sp.addSupportedProtocol("urn:oasis:names:tc:SAML:2.0:protocol");


SingleLogoutServiceBuilder slsb = new SingleLogoutServiceBuilder();
SingleLogoutService sls = slsb.buildObject();
sls.setLocation(url);
sls.setBinding("urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect");
sp.getSingleLogoutServices().add(sls);

sls = slsb.buildObject();
sls.setLocation(url);
sls.setBinding("urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST");
sp.getSingleLogoutServices().add(sls);

AssertionConsumerServiceBuilder acsb = new AssertionConsumerServiceBuilder();
AssertionConsumerService acs = acsb.buildObject();
acs.setLocation(url);
acs.setBinding("urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST");
acs.setIndex(0);
acs.setIsDefault(true);
sp.getAssertionConsumerServices().add(acs);

acs = acsb.buildObject();
acs.setLocation(url);
acs.setBinding("urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect");
acs.setIndex(1);
sp.getAssertionConsumerServices().add(acs);

if (params.get("spSigKey") != null && ! params.get("spSigKey").getValue().isEmpty()) {
	String alias = params.get("spSigKey").getValue();
	java.security.cert.X509Certificate certFromKS = (java.security.cert.X509Certificate) cfg.getCertificate(alias);
	
	if (certFromKS == null) {
		throw new Exception("Certificate '" + params.get("spSigKey").getValue() + "' not found");
	}
	
	PrivateKey keyFromKS = (PrivateKey) cfg.getPrivateKey(alias);
	KeyDescriptorBuilder kdb = new KeyDescriptorBuilder();
	KeyDescriptor kd = kdb.buildObject();
	kd.setUse(UsageType.SIGNING);
	KeyInfoBuilder kib = new KeyInfoBuilder();
	KeyInfo ki = kib.buildObject();
	
	X509DataBuilder x509b = new X509DataBuilder();
	X509Data x509 = x509b.buildObject();
	X509CertificateBuilder certb = new X509CertificateBuilder();
	org.opensaml.xmlsec.signature.X509Certificate cert = certb.buildObject();
	cert.setValue(new String(org.apache.xml.security.utils.Base64.encode(certFromKS.getEncoded())));
	x509.getX509Certificates().add(cert);
	ki.getX509Datas().add(x509);
	kd.setKeyInfo(ki);
	sp.getKeyDescriptors().add(kd);
	
	
	
}

if (params.get("spEncKey") != null && ! params.get("spEncKey").getValue().isEmpty()) {
	String alias = params.get("spEncKey").getValue();
	java.security.cert.X509Certificate certFromKS = (java.security.cert.X509Certificate) cfg.getCertificate(alias);
	
	if (certFromKS == null) {
		throw new Exception("Certificate '" + params.get("spEncKey").getValue() + "' not found");
	}
	
	PrivateKey keyFromKS = (PrivateKey) cfg.getPrivateKey(alias);
	KeyDescriptorBuilder kdb = new KeyDescriptorBuilder();
	KeyDescriptor kd = kdb.buildObject();
	kd.setUse(UsageType.ENCRYPTION);
	KeyInfoBuilder kib = new KeyInfoBuilder();
	KeyInfo ki = kib.buildObject();
	
	X509DataBuilder x509b = new X509DataBuilder();
	X509Data x509 = x509b.buildObject();
	X509CertificateBuilder certb = new X509CertificateBuilder();
	org.opensaml.xmlsec.signature.X509Certificate cert = certb.buildObject();
	cert.setValue(new String(org.apache.xml.security.utils.Base64.encode(certFromKS.getEncoded())));
	x509.getX509Certificates().add(cert);
	ki.getX509Datas().add(x509);
	kd.setKeyInfo(ki);
	sp.getKeyDescriptors().add(kd);
	
	
	
}


EntityDescriptorMarshaller marshaller = new EntityDescriptorMarshaller();

// Marshall the Subject
Element assertionElement = marshaller.marshall(ed);

String xml = net.shibboleth.utilities.java.support.xml.SerializeSupport.prettyPrintXML(assertionElement);


%><%= xml %>