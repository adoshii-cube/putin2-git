<%-- 
    Document   : index
    Created on : 15 Dec, 2016, 4:54:27 PM
    Author     : adoshi
--%>
<%@page import="org.icube.dashboard.LocationData"%>
<%@page import="org.icube.role.Role"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.GregorianCalendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page import="org.icube.dashboard.DashboardHelper"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="org.icube.candidate.Candidate"%>
<%@page import="org.icube.helper.MasterListHelper"%>
<%@page import="org.icube.candidate.CandidateHelper"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>OWEN Analytics - AI driven people solutions</title>

        <meta name="description" content="Axis Bank - OWEN Analytics HR Solutions">
        <meta name="keywords" content="human resources, HR, big data, talent management, talent acquisition, productivity, onboarding, onboarding and engagement, recruitment, solution, insights, machine learning, artificial intelligence, organizational network analysis, ona, retention, attrition">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        <meta content="IE=11;IE=Edge" http-equiv="X-UA-Compatible">
        <meta charset="utf-8">

        <meta itemprop="name" content="OWEN Analytics - AI driven people solutions">
        <meta itemprop="description" content="Axis Bank - OWEN Analytics HR Solutions">

        <meta property="og:type" content="website">
        <meta property="og:title" content="OWEN Analytics">
        <meta property="og:description" content="Axis Bank - OWEN Analytics HR Solutions">
        <meta property="og:url" content="http://www.owenanalytics.com/index.html/">
        <meta property="og:site_name" content="OWEN Analytics">
        <meta property="og:locale" content="en_IN">


        <!-- Page styles -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="css/material.min.css">
        <link href="css/materialdesignicons.css" media="all" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="css/mdl-selectfield.min.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>


        <script src="https://code.highcharts.com/highcharts.js"></script>
        <!--<script src="https://code.highcharts.com/modules/data.js"></script>-->
        <script src="https://code.highcharts.com/modules/drilldown.js"></script>

        <link rel='shortcut icon' type='image/x-icon' href='images/OWEN_Favicon.ico'/>

        <!-- Chrome, Firefox OS and Opera -->
        <meta name="theme-color" content="#303f9f">
        <!-- Windows Phone -->
        <meta name="msapplication-navbutton-color" content="#303f9f">
        <!-- iOS Safari -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="#303f9f">
    </head>
    <body>
        <div class="mdl-layout mdl-js-layout">
            <header class="mdl-layout__header mdl-layout__header--waterfall">
                <!-- Top row, always visible -->
                <div class="mdl-layout__header-row">
                    <!-- Title -->
                    <span class="mdl-layout-title">
                        <img class="android-logo-image" src="images/OWEN_Logo_white.png" alt="OWEN Logo">
                    </span>
                </div>
                <!-- Bottom row, not visible on scroll -->
                <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
                    <a href="#scroll-tab-1" class="mdl-layout__tab is-active">DASHBOARD</a>
                    <a href="#scroll-tab-2" class="mdl-layout__tab">CANDIDATES</a>
                </div>
            </header>
            <div class="mdl-layout__drawer">
                <span class="mdl-layout-title">INSTRUCTIONS</span>

            </div>
            <main class="mdl-layout__content">
                <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                    <div class="page-content">
                        <div class="mdl-grid">
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
                                <div id="get-candidates-per-month">
                                    <%
                                        DashboardHelper dh = new DashboardHelper();
                                        Map<java.util.Date, Integer> candidateCountMap = dh.getCandidatesByMonth();

                                        //CREATE JSON ARRAY                               
                                        JSONArray jArray = new JSONArray();
                                        for (Date d : candidateCountMap.keySet()) {
                                            Calendar calendar = new GregorianCalendar();
                                            calendar.setTime(d);

                                            //EXTRACT DATE FROM JAVA INTO CALENDAR OBJECT
                                            int year = calendar.get(Calendar.YEAR);
                                            int month = calendar.get(Calendar.MONTH);
                                            int day = calendar.get(Calendar.DAY_OF_MONTH);
                                            int count = candidateCountMap.get(d);

                                            //CONVERT DATE TO JSONARRAY
                                            JSONObject jObj = new JSONObject();
                                            jObj.put("year", year);
                                            jObj.put("month", month);
                                            jObj.put("day", day);
                                            jObj.put("count", count);
                                            jArray.put(jObj);
                                        }
                                    %>
                                    <input type="hidden" id="object" value='<%=jArray%>'/>
                                </div>
                            </div>
                            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
                                <div id="get-location-count">
                                    <%
                                        List<LocationData> locationCountList = dh.getLocationCount();
                                        JSONArray jArrayRegionCount = new JSONArray();
                                        JSONArray jArrayCircleCount = new JSONArray();
                                        JSONArray jArrayCityCount = new JSONArray();
                                        for (LocationData ld : locationCountList) {
                                            int regionId = ld.getRegionId();
                                            int circleId = ld.getCircleId();
                                            int cityId = ld.getCityId();

                                            JSONObject json = new JSONObject();
                                            json.put("regionId", regionId);
                                            json.put("regionName", ld.getRegionName());
                                            json.put("circleId", circleId);
                                            json.put("circleName", ld.getCircleName());
                                            json.put("cityId", cityId);
                                            json.put("cityName", ld.getCityName());
                                            json.put("count", ld.getCandidateCount());

                                            if (regionId > 0 && circleId == 0 && cityId == 0) {
                                                jArrayRegionCount.put(json);
                                            } else if (regionId > 0 && circleId > 0 && cityId == 0) {
                                                jArrayCircleCount.put(json);
                                            } else {
                                                jArrayCityCount.put(json);
                                            }
                                        }
                                    %>
                                    <input type="hidden" id="jArrayRegionCount" value='<%=jArrayRegionCount%>'/>
                                    <input type="hidden" id="jArrayCircleCount" value='<%=jArrayCircleCount%>'/>
                                    <input type="hidden" id="jArrayCityCount" value='<%=jArrayCityCount%>'/>
                                </div>
                            </div>
                            <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
                                <div id="get-role-count">
                                    <%
                                        List<Role> roleCountList = dh.getRoleCount(0, 0);
                                        JSONArray jArrayRoleCount = new JSONArray();
                                        for (Role r : roleCountList) {
                                            JSONObject jObj = new JSONObject();
                                            jObj.put("name", r.getRole());
                                            jObj.put("id", r.getRoleId());
                                            jObj.put("count", r.getCandidateCount());
                                            jArrayRoleCount.put(jObj);
                                        }
                                    %>
                                    <input type="hidden" id="jArrayRoleCount" value='<%=jArrayRoleCount%>'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mdl-layout__tab-panel" id="scroll-tab-2">
                    <%                        MasterListHelper mlh = new MasterListHelper();
                        Map<Integer, String> regionMaster = mlh.getRegionMasterList();
                        Map<Integer, String> circleMaster = mlh.getCircleMasterList();
                        Map<Integer, String> cityMaster = mlh.getCityMasterList();
                        Map<Integer, String> roleMaster = mlh.getRoleMasterList();
                    %>
                    <div class="page-content">
                        <div class="mdl-grid">
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-shadow--3dp">
                                <form action="#">
                                    <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                                        <select id="dropdown_region" name="region" class="mdl-selectfield__select" required>
                                            <%
                                                for (Map.Entry<Integer, String> entry : regionMaster.entrySet()) {
                                            %>
                                            <option value="<%=entry.getKey()%>" > <%=entry.getValue()%> </option>
                                            <% }%>
                                        </select>
                                        <label for="dropdown_region" class="mdl-selectfield__label">REGION</label>
                                        <span class="mdl-selectfield__error">Please select a region</span>
                                    </div>
                                    <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                                        <select id="dropdown_circle" name="circle" class="mdl-selectfield__select" required>
                                            <%
                                                for (Map.Entry<Integer, String> entry : circleMaster.entrySet()) {
                                            %>
                                            <option value="<%=entry.getKey()%>"  > <%=entry.getValue()%> </option>
                                            <% }%>
                                        </select>
                                        <label for="dropdown_circle" class="mdl-selectfield__label">CIRCLE</label>
                                        <span class="mdl-selectfield__error">Please select a circle</span>
                                    </div>
                                    <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                                        <select id="dropdown_city" name="city" class="mdl-selectfield__select">
                                            <%
                                                for (Map.Entry<Integer, String> entry : cityMaster.entrySet()) {
                                            %>
                                            <option value="<%=entry.getKey()%>"  > <%=entry.getValue()%> </option>
                                            <% }%>
                                        </select>
                                        <label for="dropdown_city" class="mdl-selectfield__label">CITY</label>
                                    </div>
                                    <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                                        <select id="dropdown_role" name="role" class="mdl-selectfield__select">
                                            <%
                                                for (Map.Entry<Integer, String> entry : roleMaster.entrySet()) {
                                            %>
                                            <option value="<%=entry.getKey()%>" > <%=entry.getValue()%> </option>
                                            <% }%>
                                        </select>
                                        <label for="dropdown_role" class="mdl-selectfield__label">ROLE</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="mdl-grid" id="candidateTable">                    
                            <%
                                CandidateHelper ch = new CandidateHelper();
                                List<Candidate> candidateList = ch.getCandidateListByFilter(1, 0, 0, 0);
                            %>
                            <table class="mdl-data-table mdl-js-data-table">
                                <thead>
                                    <tr>
                                        <th class="mdl-data-table__cell--non-numeric">Name</th>
                                        <th class="mdl-data-table__cell--non-numeric">Role</th>
                                        <th class="mdl-data-table__cell--non-numeric">City</th>
                                        <th>Mobile Number</th>
                                        <th class="mdl-data-table__cell--non-numeric">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <%for (Candidate c : candidateList) {%>
                                    <tr>
                                        <td class="mdl-data-table__cell--non-numeric" id="tt-<%=c.getName()%>"><div><%=c.getName()%></div></td>
                                        <td class="mdl-data-table__cell--non-numeric" id="tt-<%=c.getMobileNumber()%>"><div><%=c.getRole()%></div></td>
                                        <td class="mdl-data-table__cell--non-numeric"><div><%=c.getCity()%></div></td>
                                        <td><div><%=c.getMobileNumber()%></div></td>
                                        <td class="mdl-data-table__cell--non-numeric" id="tt-<%=c.getEmailId()%>"><div><%=c.getEmailId()%></div></td>
                                    </tr>
                                <div class="mdl-tooltip" data-mdl-for="tt-<%=c.getName()%>">
                                    <%=c.getName()%>
                                </div>
                                <div class="mdl-tooltip" data-mdl-for="tt-<%=c.getMobileNumber()%>">
                                    <%=c.getRole()%>
                                </div>
                                <div class="mdl-tooltip" data-mdl-for="tt-<%=c.getEmailId()%>">
                                    <%=c.getEmailId()%>
                                </div>
                                <%}%>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
        <script src="js/material.min.js"></script>
        <script src="js/mdl-selectfield.min.js"></script>
        <script src="js/axis.js"></script>
    </body>
</html>
