import React from 'react';
import { Image, View, Text, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const TermsAndConditions = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="max-w-[80vh] min-h-[80vh] px-4 py-6">
        <Image source={images.logo} className="w-[95px] h-[95px]" />
        {/* Title */}
        <Text className="text-3xl font-bold text-white mb-4">Privacy Policy</Text>
        <Text className="text-lg text-gray-300 mb-4">Last updated: December 06, 2024</Text>
        <Text className="text-base text-gray-400 mb-4">
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
          information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </Text>
        <Text className="text-base text-gray-400 mb-4">
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection
          and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the
          help of the{' '}
          <Text
            className="text-blue-400 underline"
            onPress={() => Linking.openURL('https://www.termsfeed.com/privacy-policy-generator/')}
          >
            Privacy Policy Generator
          </Text>
          .
        </Text>

        {/* Interpretation and Definitions */}
        <Text className="text-2xl font-bold text-white mb-4">Interpretation and Definitions</Text>
        <Text className="text-xl font-semibold text-white mb-2">Interpretation</Text>
        <Text className="text-base text-gray-400 mb-4">
          The words of which the initial letter is capitalized have meanings defined under the following conditions. The
          following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </Text>
        <Text className="text-xl font-semibold text-white mb-2">Definitions</Text>
        <Text className="text-base text-gray-400 mb-4">For the purposes of this Privacy Policy:</Text>
        <View className="ml-4 space-y-2">
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Account:</Text> means a unique account created for You to access our Service
            or parts of our Service.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Affiliate:</Text> means an entity that controls, is controlled by or is under
            common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or
            other securities entitled to vote for election of directors or other managing authority.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Application:</Text> refers to FixiGo, the software program provided by the
            Company.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Company:</Text> (referred to as either "the Company", "We", "Us" or "Our" in
            this Agreement) refers to FixiGo.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Country:</Text> refers to: Philippines.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Device:</Text> means any device that can access the Service such as a
            computer, a cellphone or a digital tablet.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Personal Data:</Text> is any information that relates to an identified or
            identifiable individual.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Service:</Text> refers to the Application.
          </Text>
          <Text className="text-base text-gray-400">
            <Text className="font-semibold">Service Provider:</Text> means any natural or legal person who processes the
            data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to
            facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the
            Service or to assist the Company in analyzing how the Service is used.
          </Text>
        </View>

        {/* Collecting and Using Your Personal Data */}
        <Text className="text-2xl font-bold text-white mb-4">Collecting and Using Your Personal Data</Text>
        <Text className="text-xl font-semibold text-white mb-2">Types of Data Collected</Text>
        <Text className="text-lg font-semibold text-white mb-2">Personal Data</Text>
        <Text className="text-base text-gray-400 mb-4">
          While using Our Service, We may ask You to provide Us with certain personally identifiable information that
          can be used to contact or identify You. Personally identifiable information may include, but is not limited
          to:
        </Text>
        <View className="ml-4 space-y-2">
          <Text className="text-base text-gray-400">• Email address</Text>
          <Text className="text-base text-gray-400">• First name and last name</Text>
          <Text className="text-base text-gray-400">• Phone number</Text>
          <Text className="text-base text-gray-400">• Address, State, Province, ZIP/Postal code, City</Text>
          <Text className="text-base text-gray-400">• Usage Data</Text>
        </View>

        {/* Additional Sections (add content following the same pattern) */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
