<%-- 
    Document   : candidateTable
    Created on : 21 Dec, 2016, 12:54:40 PM
    Author     : adoshi
--%>

<%@page import="org.icube.candidate.Candidate"%>
<%@page import="java.util.List"%>
<%@page import="org.icube.candidate.CandidateHelper"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Candidate Table</title>
    </head>
    <body>
        <!--<div class="mdl-grid" id="candidateTable">-->                    
            <%
                CandidateHelper ch = new CandidateHelper();
                int regionId = Integer.parseInt(request.getParameter("region"));
                int circleId = Integer.parseInt(request.getParameter("circle"));
                int cityId = Integer.parseInt(request.getParameter("city"));
                int roleId = Integer.parseInt(request.getParameter("role"));
                System.out.println("regionId = " + regionId);
                List<Candidate> candidateList = ch.getCandidateListByFilter(regionId, circleId, cityId, roleId);
                System.out.println("Table Calling");
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
                        <th class="mdl-data-table__cell--non-numeric"><%=c.getName()%></th>
                        <th class="mdl-data-table__cell--non-numeric"><%=c.getRole()%></th>
                        <th class="mdl-data-table__cell--non-numeric"><%=c.getCity()%></th>
                        <th><%=c.getMobileNumber()%></th>
                        <th class="mdl-data-table__cell--non-numeric"><%=c.getEmailId()%></th>
                    </tr>
                    <%}
                    System.out.println("Table Call OVER");
                    %>
                </tbody>
            </table>
        <!--</div>-->
    </body>
</html>
