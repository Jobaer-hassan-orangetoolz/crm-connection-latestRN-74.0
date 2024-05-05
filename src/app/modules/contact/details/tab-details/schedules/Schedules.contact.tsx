import {View, Text} from 'react-native';
import React from 'react';
import {isEmpty} from '../../../../../utilities/helper.utility';

const ContactSchedules: React.FC<{id: string}> = ({id = ''}) => {
  const htmlEntityReplace = string => {
    if (isEmpty(string)) {
      return '';
    }
    const rex = /(<([^>]+)>)/gi;
    return string.replace(rex, '');
  };
  return (
    <View style={{flex: 1}}>
      <Text>ContactSchedules {id}</Text>

      <Text>
        {htmlEntityReplace(
          'Hello Wordld<br />\n<div class="user_signature_content">\n<div>\n<div>\n<p><img src="https://s3.us-east-1.amazonaws.com/pypepro/user/1/eKI6awKObVbiNwG13Y4vmkGxHkjRFfVvMYVOlu1m.png" alt="" width="101" height="101" /></p>\n<h1><span style="background-color: #ffffff;">Orange Toolz</span></h1>\n<h4><em><span style="background-color: #ffffff;">Digital Agency of My Offer 360 Degree</span></em></h4>\n<p>Sector 10, Uttara, Dhaka 1230, Bangladesh</p>\n</div>\n</div>\n</div>',
        )}
      </Text>
    </View>
  );
};

export default ContactSchedules;
