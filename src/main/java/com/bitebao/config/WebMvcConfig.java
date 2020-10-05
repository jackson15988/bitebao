package com.bitebao.config;

import com.bitebao.aop.CheckIsLoginInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final CheckIsLoginInterceptor checkIsLoginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkIsLoginInterceptor)
                .addPathPatterns("/*")
                .excludePathPatterns("/login","/doLogin","/css/**","/js/**","/img/**");
    }
}
