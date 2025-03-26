// var certificationsList will load as js file

for (var i in certificationsList){
    var row = `<li class="list-item">
                <i class="fa-li fa fa-trophy text-warning"></i>
                 ${certificationsList[i].Name}
                 <a href="${certificationsList[i].Link}" target="_blank">
                     <span class="badge badge-secondary badge-orange">View Certificate</span>
                </a>

                </li>`

    var list = $('#certificate_list')
    list.append(row)
}

// var skillList will load as js file

// for (var i in skillList){
//     var row =   `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div class="tile">
//                     <img style=" height: 150px;" src="img/logo/${skillList[i].Image_name}" alt="Image 1" class="img-fluid">
//                   </div>
//                 </div>`
                
//     var list = $('#skills')
//     list.append(row)
// }

$(document).ready(function() {
  var groupedSkills = {};

  // Group skills by Technology
  skillList.forEach(function(skill) {
      if (skill.Flag !== 1) return; // Skip if Flag is not 1
      if (!groupedSkills[skill.Technology]) {
          groupedSkills[skill.Technology] = [];
      }
      groupedSkills[skill.Technology].push(skill);
  });

  Object.keys(groupedSkills).forEach(function(technology) {
      // Create and append the technology heading
      var heading = $('<h4 class="subheading mb-3"></h4>').text(technology);
      $('#skills').append(heading);

      // Create a container for this technology's skills
      var container = $('<div class="container"><div class="row"></div></div>');
      var row = container.find('.row');

      // Populate the container with skills
      groupedSkills[technology].forEach(function(skill) {
          var skillHTML = `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                              <div class="tile">
                                  <img style="height: 150px;" src="img/logo/${skill.Image_name}" alt="${skill.Tools}" class="img-fluid">
                              </div>
                           </div>`;
          row.append(skillHTML);
      });

      // Append the container to the main skills section
      $('#skills').append(container);
  });
});
