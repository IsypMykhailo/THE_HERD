package org.theherd.app.thymeleaflayout;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(org.theherd.app.thymeleaflayout.ThymeleafLayoutApplication.class);
    }

}
