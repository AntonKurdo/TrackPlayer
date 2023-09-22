import React from 'react';
import {View, useWindowDimensions} from 'react-native';

import {withTheme} from '../../hocs/with-theme';
import {Colors, getColors} from '../../style/colors';
import {Canvas, Drawing, Skia, useImage} from '@shopify/react-native-skia';
import {makeImageParticles} from './skia-pixelated-image.utils';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {styles} from './skia-pixelated-image.styles';

const FRICTION = 0.88;
const MOVE_SPEED = 0.88;

export const SkiaPixelatedImage = withTheme(({theme}) => {
  const {setOptions} = useNavigation();

  const {width: stageWidth, height: stageHeight} = useWindowDimensions();

  const image = useImage(
    'https://media.vogue.fr/photos/5c59bddc59bfc292a25608f0/2:3/w_2560%2Cc_limit/van_gogh_tournesols_6359.jpg',
  );

  if (!image) {
    return <></>;
  }

  const particles = makeImageParticles(image, 34, 16, stageWidth, stageHeight);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => setOptions({tabBarVisible: false}))
    .onEnd(() => setOptions({tabBarVisible: true}))
    .onChange(e => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = e.x - particle.x;
        const dy = e.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 50;
        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);

          const tx = particle.x + Math.cos(angle) * minDist;
          const ty = particle.y + Math.sin(angle) * minDist;

          const ax = tx - e.x;
          const ay = ty - e.y;

          particle.vx -= ax;
          particle.vy -= ay;
        }
      }
    });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColors(theme, Colors.background),
        },
      ]}>
      <GestureDetector gesture={pan}>
        <Canvas
          mode="continuous"
          style={{
            width: stageWidth,
            height: stageHeight,
          }}>
          <Drawing
            drawing={({canvas}) => {
              canvas.clear(Skia.Color(getColors(theme, Colors.background)));
              for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                particle.x += (particle.savedX - particle.x) * MOVE_SPEED;
                particle.y += (particle.savedY - particle.y) * MOVE_SPEED;

                particle.vx *= FRICTION;
                particle.vy *= FRICTION;

                particle.x += particle.vx;
                particle.y += particle.vy;

                canvas.save();
                canvas.translate(particle.x, particle.y);
                canvas.drawPicture(particle.picture);
                canvas.restore();
              }
            }}
          />
        </Canvas>
      </GestureDetector>
    </View>
  );
});
