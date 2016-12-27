<%-- 
    Document   : roleCount
    Created on : 26 Dec, 2016, 12:48:05 PM
    Author     : adoshi
--%>

<%@page import="org.icube.dashboard.DashboardHelper"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.icube.role.Role"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    DashboardHelper dh = new DashboardHelper();
    int regionId = Integer.parseInt(request.getParameter("region"));
    System.out.println("REGION ID AJAX::::::" + regionId);
//            int circleId = Integer.parseInt(request.getParameter("circle"));
    List<Role> roleCountList = dh.getRoleCount(regionId, 0);
    JSONArray jArrayRoleCount = new JSONArray();
    for (Role r : roleCountList) {
        JSONObject jObj = new JSONObject();
        jObj.put("name", r.getRole());
        jObj.put("id", r.getRoleId());
        jObj.put("count", r.getCandidateCount());
        jArrayRoleCount.put(jObj);
    }

    response.setContentType("application/json");
    response.getWriter().write(jArrayRoleCount.toString());


%>
