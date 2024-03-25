package com.the_herd.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminPageController {

    @RequestMapping({"/admin/dashboard","/admin"})
    public String dashboard(){
        return "admin/dashboard";
    }

    @RequestMapping({"/admin/user/list","/admin/user"})
    public String listUser(){
        return "admin/user-list";
    }

    @RequestMapping("/admin/user/add")
    public String addUser(){
        return "admin/user-add";
    }

}
