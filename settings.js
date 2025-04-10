        function toggleDropdown() {
          document.getElementById("myDropdown").classList.toggle("show");
        }
      
        function selectTheme(theme) {
          console.log(`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode selected`);
          // Optionally close the dropdown after selection
          document.getElementById("myDropdown").classList.remove("show");

        }
      
        window.onclick = function(e) {
          if (!e.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
              const openDropdown = dropdowns[i];
              if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
              }
            }
          }
        }
        function selectTheme(theme) {
    console.log(`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode selected`);
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-default');
    document.body.classList.add(`theme-${theme}`);
     document.getElementById("myDropdown").classList.remove("show");
}
function selectTheme(theme) {
  console.log(`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode selected`);
  localStorage.setItem('prismyteTheme', theme);
  document.body.classList.remove('theme-dark', 'theme-light', 'theme-default');
  document.body.classList.add(`theme-${theme}`);
  document.getElementById("myDropdown").classList.remove("show");
};