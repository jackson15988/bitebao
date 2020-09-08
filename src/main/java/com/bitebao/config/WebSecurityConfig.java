package com.bitebao.config;

import com.bitebao.security.MyAuthenctiationFailureHandler;
import com.bitebao.security.MyAuthenctiationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@EnableWebSecurity // 註解開啟Spring Security的功能
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    MyAuthenctiationFailureHandler myAuthenctiationFailureHandler;

    @Autowired
    MyAuthenctiationSuccessHandler myAuthenctiationSuccessHandler;

    @Override
    public void configure(WebSecurity web) throws Exception {
        //解決靜態資源被攔截的問題
        web.ignoring().antMatchers("/**");
        web.ignoring().antMatchers("/static/css/**");
        web.ignoring().antMatchers("/static/js/**");
        web.ignoring().antMatchers("/static/img/**");
        web.ignoring().antMatchers("/static/webfonts/**");
        web.ignoring().antMatchers("/lib/**");
        web.ignoring().antMatchers("/fonts/**");
        web.ignoring().antMatchers("/lang/**");
        web.ignoring().antMatchers("/static/media/**");
        web.ignoring().antMatchers("/**/*.ico");
        /*        web.ignoring().antMatchers("/login.html");*/
        //解決服務註冊url被攔截的問題
        web.ignoring().antMatchers("/swagger-resources/**");
        web.ignoring().antMatchers("/v2/**");
        web.ignoring().antMatchers("/**/*.json");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                .failureHandler(myAuthenctiationFailureHandler) // 自定義登入失敗處理
                .successHandler(myAuthenctiationSuccessHandler) // 自定義登入成功處理
                .and()
                .authorizeRequests()  //定義哪些url需要保護，哪些url不需要保護
                .anyRequest().authenticated()
                .and()
                .sessionManagement().maximumSessions(1)
                .and()
                .and()
                .logout()
                .logoutUrl("/logout")
                .and()
                .formLogin()
                .loginPage("/login.html")  //定義當需要使用者登入時候，轉到的登入頁面
                .loginProcessingUrl("/meureka/login")  // 自定義的登入介面
                .permitAll()
                .defaultSuccessUrl("/index.html").permitAll()
                .and()
                .logout()
                .permitAll()
                // 自動登入
                .and().rememberMe();
        http.csrf().disable();
        //解決中文亂碼問題
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        http.addFilterBefore(filter, CsrfFilter.class);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin")
                .password("12345678")
                .roles("USER");
        //在記憶體中建立了一個使用者，該使用者的名稱為user，密碼為password，使用者角色為USER
    }
}
