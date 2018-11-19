package com.enation.app.shop.core.goods.model.mapper;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.enation.app.base.core.model.Adv;
import com.enation.app.shop.core.goods.model.Brand;
import com.enation.app.shop.core.goods.model.Goods;
import com.enation.eop.sdk.utils.StaticResourcesUtil;
/**
 * 品牌Mapper<br>
 * 会将本地文件存储的图片地址前缀替换为静态资源服务器地址。
 * @author kingapex
 * 2010-7-16下午03:17:28
 */
public class AdvMapper implements RowMapper {

	public Object mapRow(ResultSet rs, int arg1) throws SQLException {
		Adv adv=new Adv();
		adv.setAid(rs.getInt("aid"));
		adv.setAtturl(rs.getString("atturl"));
		/*String logo = rs.getString("logo");
		if(logo!=null){
			logo  =StaticResourcesUtil.convertToUrl(logo);
		}*/
		return adv;
	}
}