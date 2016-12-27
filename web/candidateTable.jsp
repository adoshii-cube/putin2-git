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
        <%
            CandidateHelper ch = new CandidateHelper();
            int regionId = Integer.parseInt(request.getParameter("region"));
            int circleId = Integer.parseInt(request.getParameter("circle"));
            int cityId = Integer.parseInt(request.getParameter("city"));
            int roleId = Integer.parseInt(request.getParameter("role"));
            List<Candidate> candidateList = ch.getCandidateListByFilter(regionId, circleId, cityId, roleId);
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
                <%
                    if (candidateList.size() >= 1) {
                        System.out.println("ALL GOOD");
                        for (Candidate c : candidateList) {
                %>
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
            <%
                }
            } else {
                System.out.println("EMPTY STATE MSG");
            %>
            <script type="text/javascript">
                $('table').replaceWith('\
            <div class="empty-state"><img src="images/empty_state.png" alt="No results available for selection. Please try again"></div>\n\
');
            </script>
            <%
                }
            %>
        </tbody>
    </table>
</body>
</html>
