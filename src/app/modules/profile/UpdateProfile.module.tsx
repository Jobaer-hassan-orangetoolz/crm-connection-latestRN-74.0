import {View, Text} from 'react-native';
import React from 'react';
import IconWithTextHeader from '../../components/core/headers/IconWithTextHeader.app.component';
import Container from '../../layouts/Container.layout';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {
  customMargin,
  customPadding,
} from '../../assets/styles/global.style.asset';
import CustomButton from '../../components/core/button/CustomButton.core.component';
import rs from '../../assets/styles/responsiveSize.style.asset';
import CustomFieldLayout from '../contact/add/custom-fields/Layout.customField';
import {profileStyles as styles} from './styles/profile.styles';
import {buttons} from '../../assets/js/buttons.message';
import useUpdateProfile from './hook/useUpdateProfile.hook';
import {formatPhoneNumber} from '../../utilities/helper.utility';
const UpdateProfile: React.FC<{
  route: {params: {name: string}};
  navigation: any;
}> = ({
  route: {
    params: {name},
  },
  navigation,
}) => {
  const {values, title, description, field, handleChange, handleSubmit} =
    useUpdateProfile(name);
  return (
    <Container>
      <IconWithTextHeader />
      <View style={styles.updateProfileContainer}>
        <View>
          <Text style={typographies.headingLarge} numberOfLines={2}>
            {title}
          </Text>
          <Text
            style={[
              typographies.bodyMedium,
              {...customPadding(8, 0, 12), color: colors.gray4},
            ]}
            numberOfLines={2}>
            {description}
          </Text>
          <View style={{gap: rs(20), ...customMargin(24)}}>
            {name.toLowerCase() === 'name' ? (
              field.map((item: any, index: number) => {
                return (
                  <CustomFieldLayout
                    label={item.title}
                    value={(values as any)[item.name]}
                    key={index}
                    placeholder={item.placeholder}
                    onChange={handleChange}
                    type={item.type}
                    tag={item.name}
                    options={item.options}
                    showRemove={false}
                  />
                );
              })
            ) : (
              <CustomFieldLayout
                label={field.title}
                value={
                  field.name === 'number'
                    ? formatPhoneNumber((values as any)[field.name])
                    : (values as any)[field.name]
                }
                placeholder={field.placeholder}
                onChange={handleChange}
                type={field.type}
                tag={field.name}
                options={field.options}
                showRemove={false}
              />
            )}
          </View>
        </View>
        <View style={{gap: rs(12)}}>
          <CustomButton text={buttons.saveChanges} onPress={handleSubmit} />
          <CustomButton
            text={buttons.cancel}
            classes="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </Container>
  );
};

export default UpdateProfile;
