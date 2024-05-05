import React, {useState} from 'react';
import Container from '../../../layouts/Container.layout';
import WebViewHeader from './WebViewHeader';
import {webViewStyle} from './style/webView.style';
import {Text, View} from 'react-native';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import {WebCustomView} from '../../../packages/webview.package';
type Route = {
  params: {
    title?: string;
    url?: string;
  };
};
const CustomWebView: React.FC<{route: Route}> = ({
  route: {params: {title = '', url = ''} = {}} = {},
}) => {
  const [loading, setLoading] = useState(0);
  const styles = webViewStyle;
  return (
    <Container ph={0}>
      <WebViewHeader loading={loading} title={title} url={url} />
      <View style={[styles.relative, globalStyles.flex1]}>
        {url && (
          <WebCustomView
            source={{uri: url}}
            style={globalStyles.flex1}
            onLoadProgress={({nativeEvent}) => {
              setLoading(nativeEvent.progress);
            }}
            onError={() => {}}
            renderError={() => (
              <View style={globalStyles.centerView}>
                <Text>Could Not Open URL</Text>
              </View>
            )}
          />
        )}
      </View>
    </Container>
  );
};
export default CustomWebView;
