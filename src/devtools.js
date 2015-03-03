// Load Panels
chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
    function(sidebar) {
        // sidebar initialization code here
        sidebar.setObject({ some_data: "Some data to show" });
});
chrome.devtools.panels.create(
    'Tohken Helper',
    null, // No icon path
    'Panel/Helper.html',
    null // no callback needed
);
