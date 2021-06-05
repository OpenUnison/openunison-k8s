function update_new_project(scale,attr_cfg) {
    var gitUrlAttribute;
    var gitSshKeyAttribute;

    for (var ii = 0; ii < scale.attributeConfigs.length; ii++) {
        if (scale.attributeConfigs[ii].name == 'gitUrl') {
            gitUrlAttribute = scale.attributeConfigs[ii];
            
        } else if (scale.attributeConfigs[ii].name == 'gitSshKey') {
            gitSshKeyAttribute = scale.attributeConfigs[ii];
        }

        
    }

    
    var targetToCheck = scale.newUser.attributes[attr_cfg.name];

    


    $.getJSON('/newproject/target-metadata/' + targetToCheck.value,
        function(result) {
            targetMetadata = result;
            gitUrlAttribute.show = targetMetadata.isGit;
            gitSshKeyAttribute.show = targetMetadata.isGit;
            var scope = angular.element($("#outer")).scope();
            scope.$apply();
        }
    );
}