package com.le07.catering.shiro.realm;

import com.google.common.base.Objects;
import com.google.common.collect.Lists;
import com.le07.catering.web.Constants;
import com.le07.commonservice.identity.manager.IdentityManager;
import com.le07.commonservice.identity.model.Role;
import com.le07.commonservice.identity.model.User;
import com.le07.framework.util.EncodeUtils;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;

/**
 * 基于DB的Realm实现
 * <p/>
 * Created with IDEA User: 虎 Date: 13-7-31 Time: 下午9:32
 */
public class ShiroDbRealm extends AuthorizingRealm {
	protected Logger LOG = LoggerFactory.getLogger(ShiroDbRealm.class);

	private IdentityManager identityService;

	public void setIdentityService(IdentityManager identityService) {
		this.identityService = identityService;
	}

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		ShiroUser shiroUser = (ShiroUser) principals.getPrimaryPrincipal();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		List<Role> roles = identityService.getUserRoles(shiroUser.getId());
		List<String> permissionses;
		if (CollectionUtils.isEmpty(roles)) {
			permissionses = Lists.newArrayListWithCapacity(1);
			permissionses.add("view");
		} else {
			permissionses = Lists.newArrayListWithCapacity(roles.size());
			for (Role role : roles) {
				permissionses.add(role.getPermissions());
			}
			info.addRoles(permissionses);
		}
		return info;
	}

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authToken) throws AuthenticationException {		
		UsernamePasswordToken token = (UsernamePasswordToken) authToken;
		User user = identityService.getUserByNameAndPwd(token.getUsername(),new String(token.getPassword()));
		if(user != null){
			LOG.info(user.toString());
			//LOG.info(user.getPassword());
			byte[] salt = EncodeUtils.decodeHex(user.getSalt());
			return new SimpleAuthenticationInfo(new ShiroUser(user.getId(),user.getLoginName(), user.getName()),
					user.getPassword(),ByteSource.Util.bytes(salt), getName());
			
		}else
		{
			LOG.info("the user {0} not found !", token.getUsername());
			return null;
		}
	}
	
	/**
	 * 设定Password校验的Hash算法与迭代次数.
	 */
	@PostConstruct
	public void initCredentialsMatcher() {
		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(Constants.HASH_ALGORITHM);
		matcher.setHashIterations(Constants.HASH_INTERATIONS);
		setCredentialsMatcher(matcher);
	}

	/**
	 * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息.
	 */
	public static class ShiroUser implements Serializable {
		private static final long serialVersionUID = 3985087071074637940L;
		public Long id;
		public String loginName;
		public String name;

		public ShiroUser(Long id, String loginName, String name) {
			this.id = id;
			this.loginName = loginName;
			this.name = name;
		}

		public String getLoginName() {
			return loginName;
		}

		public String getName() {
			return name;
		}

		public Long getId() {
			return id;
		}

		/**
		 * 本函数输出将作为默认的<shiro:principal/>输出.
		 */
		@Override
		public String toString() {
			return name;
		}

		/**
		 * 重载hashCode,只计算loginName;
		 */
		@Override
		public int hashCode() {
			return Objects.hashCode(loginName);
		}

		/**
		 * 重载equals,只计算loginName;
		 */
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			ShiroUser other = (ShiroUser) obj;
			if (loginName == null) {
				if (other.loginName != null)
					return false;
			} else if (!loginName.equals(other.loginName))
				return false;
			return true;
		}
	}
}
