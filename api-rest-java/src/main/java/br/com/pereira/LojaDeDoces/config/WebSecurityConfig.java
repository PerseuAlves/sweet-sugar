package br.com.pereira.LojaDeDoces.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.com.pereira.LojaDeDoces.jwtutils.JwtAuthenticationEntryPoint;
import br.com.pereira.LojaDeDoces.jwtutils.JwtFilter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtFilter filter;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
				.antMatchers("/login").permitAll()
				.antMatchers(HttpMethod.GET, "/api/aviso").permitAll()
				.antMatchers(HttpMethod.GET, "/api/aviso/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/produto").permitAll()
				.antMatchers(HttpMethod.GET, "/api/produto/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/imagem/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/usuario").permitAll()
				.antMatchers(HttpMethod.GET, "/api/usuario/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/usuario").permitAll()
				.antMatchers(HttpMethod.POST, "/api/telefone").permitAll()
				.antMatchers(HttpMethod.POST, "/api/endereco").permitAll()
				.anyRequest().authenticated()
				.and()
				.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.cors();
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
