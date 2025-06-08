package com.group6.HaUISocialMedia_server.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@Slf4j
public class MailService {
    private final JavaMailSender javaMailSender;

    public static final String EMAIL_HTML_RESET_PASS = "/html/reset-password";

    public static final String EMAIL_HTML_REGISTER = "/html/register";

    private final TemplateEngine templateEngine;

    @Value("${spring.mail.from}")
    private String mailFrom;

    public MailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void sendHtmlMail(String from, String[] to, String[] cc, String subject, String textContent) {
        try {
            final MimeMessage message = this.javaMailSender.createMimeMessage();
            final MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");
            messageHelper.setTo(to);
            messageHelper.setCc(cc);
            messageHelper.setFrom(from);
            messageHelper.setSubject(subject);
            messageHelper.setText(textContent, true);
            this.javaMailSender.send(message);
            log.info("send mail success");
        } catch (Exception e) {
            log.error("send mail fail: {}", e.getMessage());
        }
    }

    public void sendResetPasswordEmail(String[] to, Map<String, String> data, String title) {
        final Context ctx = new Context(LocaleContextHolder.getLocale());
        for (Map.Entry<String, String> entry : data.entrySet()) {
            ctx.setVariable(entry.getKey(), entry.getValue());
        }
        final String textContent = this.templateEngine.process(EMAIL_HTML_RESET_PASS, ctx);

        this.sendHtmlMail(mailFrom, to, new String[] {}, title, textContent);
    }

    public void sendRegisterEmail(String[] to, Map<String, String> data, String title) {
        final Context ctx = new Context(LocaleContextHolder.getLocale());
        for (Map.Entry<String, String> entry : data.entrySet()) {
            ctx.setVariable(entry.getKey(), entry.getValue());
        }
        final String textContent = this.templateEngine.process(EMAIL_HTML_REGISTER, ctx);

        this.sendHtmlMail(mailFrom, to, new String[] {}, title, textContent);
    }
}