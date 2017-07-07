<nop><% include head.ejs %></nop>

# Everyday For One Month I Will (EFOMIW)


<ul>
  <% for (var i = 0; i < months.length; i++) { %>
    <li>
        <a href="/<%= months[i] %>"><%= months[i] %></a>
    </li>
  <% } %>
</ul>
