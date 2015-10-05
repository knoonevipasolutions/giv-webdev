(function($){ 
  var oldinitTC = cms.initTC;
  cms.initTC = function(div){
    if(typeof div == 'string') div = document.getElementById(div);
    if(!div) { return; }
    if(typeof div.tabinited != 'undefined') {return;}
    oldinitTC(div);
    
    if(div.id == "featured_projects"){
      var featuredProjectsTC;
      var $fptc;
      $.each(cms.tabcontainers, function(idx, tc){
        //console.log(tc);
        if(tc.container.id == 'featured_projects'){
          featuredProjectsTC = tc;
          $fptc = $(tc.container);
        }
      });
      
      $(featuredProjectsTC.container).find(".tab-content").attr("style","");
      $.extend(featuredProjectsTC, {
        hideElement: function(el){  
          $(el).removeClass('active');
        },
        showElement: function(el){
          $(el).addClass('active');
        }
      });
      
      $('<div class="browse prev"></div>')
        .appendTo(featuredProjectsTC.container)
        .click(function(){
          prevTab();
        });
      
      $('<div class="browse next"></div>')
        .appendTo(featuredProjectsTC.container)
        .click(function(){
          nextTab();
        });
      $fptc.find("ul.tab-items li").click(function(){
        highlightNavItem();
      });
      
      function nextTab(){
        var nextIndex = $fptc.find('.tab-items').children('.tab-selected').index()+1;
        
        if(nextIndex >= $fptc.find('.tab-items').children('li').length){
          nextIndex = 0;
        }
        setActiveTab(nextIndex);
      }
      
      function prevTab(){
        var nextIndex = $fptc.find('.tab-items').children('.tab-selected').index()-1;
        if(nextIndex < 0){
          nextIndex = $fptc.find('ul.tab-items').children().length-1;
        }
        setActiveTab(nextIndex);
      }
      function highlightNavItem(){
       $fptc.find("ul.tab-items li.tab-selected").addClass('active').siblings().removeClass('active'); 
      }
      function setActiveTab(idx){
        
        featuredProjectsTC.setActiveTab(idx);
        highlightNavItem();
        
      }
      
      var rotateTimer;
      
      function startAutoRotate() {
        stopAutoRotate();
        rotateTimer = setTimeout(function(){
          if (getDocumentVisibilityState() != "hidden") {
            nextTab();
          } 
          startAutoRotate();
        }, 5000);
      };
      
      function stopAutoRotate() {
        clearTimeout(rotateTimer);
      };
      function getDocumentVisibilityState() {
        return typeof document.visibilityState !== "undefined" ? document.visibilityState:
          typeof document.msVisibilityState !== "undefined" ? document.msVisibilityState:
          typeof document.mozVisibilityState !== "undefined" ? document.mozVisibilityState:
          typeof document.webkitVisibilityState !== "undefined" ? document.webkitVisibilityState: 
          undefined;
      };
      
      function pause(state) {
        if (state) {
          stopAutoRotate();
        } else {
          startAutoRotate();
        }
      };
      
      $fptc.on('mouseenter', function(evt){
        pause(true);
      });
      
      $fptc.on('mouseleave', function(evt){
        pause(false);
      });
      
      setActiveTab(0);
      startAutoRotate();
    }
  };
})(jQuery);


