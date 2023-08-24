import { describe, expect, it } from 'vitest';
import { UrlHelper } from '../src/api/url';

describe('url helper', () => {
  it('image/video url validation', () => {
    const url1 = 'https://filesamples.com/samples/code/json/sample1.json';
    const isImage1 = UrlHelper.isImageUrl(url1);
    const isVideo1 = UrlHelper.isVideoUrl(url1);
    expect(isImage1).toBe(false);
    expect(isVideo1).toBe(false);

    const url2 = 'https://i.imgur.com/mXxCzXG.png';
    const isImage2 = UrlHelper.isImageUrl(url2);
    const isVideo2 = UrlHelper.isVideoUrl(url2);
    expect(isImage2).toBe(true);
    expect(isVideo2).toBe(false);

    const url3 = 'https://i.imgur.com/mXxCzXG.mp4?abc=123';
    const isImage3 = UrlHelper.isImageUrl(url3);
    const isVideo3 = UrlHelper.isVideoUrl(url3);
    expect(isImage3).toBe(false);
    expect(isVideo3).toBe(true);

    const url4 =
      'https://scontent-ams2-1.cdninstagram.com/v/t51.2885-15/366127873_652059610194188_6725814704390891778_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=2mfPWlKnFA8AX_nescf&edm=ALCvFkgBAAAA&ccb=7-5&ig_cache_key=MzE2ODQ1MjA2MzA4NDUzMTE2MQ%3D%3D.2-ccb7-5&oh=00_AfCdKGdHuIPGGzkaJoGyXOdve3wd1mXcek8uc3HcsdtSzg&oe=64DA637E&_nc_sid=6d62aa';
    const isImage4 = UrlHelper.isImageUrl(url4);
    const isVideo4 = UrlHelper.isVideoUrl(url4);
    expect(isImage4).toBe(true);
    expect(isVideo4).toBe(false);
  });

  it('url filename extraction', () => {
    const url1 = 'https://i.imgur.com/mXxCzXG.png';
    const filename1 = UrlHelper.getFilename(url1);
    expect(filename1).toBe('mXxCzXG.png');

    const url2 = 'https://i.imgur.com/mXxCzXG.png?one=two';
    const filename2 = UrlHelper.getFilename(url2);
    expect(filename2).toBe('mXxCzXG.png');

    const url3 =
      'https://scontent-fra5-2.cdninstagram.com/v/t72.14836-16/352238594_1567043987037441_8627265115430012878_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjEwODAuc3RvcnkuaGlnaCJ9&_nc_ht=scontent-fra5-2.cdninstagram.com&_nc_cat=109&_nc_ohc=kXcCY3tYNL4AX_IIDkI&edm=ALCvFkgBAAAA&vs=1426863808096164_1468746166&_nc_vs=HBkcFQAYJEdBSzgtaFFCM1RIY041RUZBTTVIVTh6cE03cDNidlE1QUFBRhUAAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJtT1rbK04%2F0%2FFQIoAkMzLBdAFu6XjU%2FfOxgSZGFzaF9oaWdoXzEwODBwX3YxEQB16AcA&_nc_rid=68e4b1f601&ccb=7-5&oh=00_AfB27QacWf6ACZ825XdkL1okN5UU3Sa01jvF9d5q4l76Aw&oe=64E36E20&_nc_sid=6d62aa';
    const filename3 = UrlHelper.getFilename(url3);
    expect(filename3).toBe(
      '352238594_1567043987037441_8627265115430012878_n.mp4'
    );

    const url4 = 'https://filesamples.com/samples/code/json/sample1.json';
    const filename4 = UrlHelper.getFilename(url4);
    expect(filename4).toBe('sample1.jso');
  });
});
