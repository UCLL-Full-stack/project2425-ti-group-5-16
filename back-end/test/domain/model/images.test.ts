import { Images } from "../../../model/images";

test('given: valid values, when: creating image, then: image is created with those values', () => {
    
    // given // when
    const valid_image = new Images({url: "fakeurl.com"});

    // then
    expect(valid_image.getUrl()).toEqual("fakeurl.com");
});

test('given: valid values, when: setting image url, then: image url is set', () => {
    
    // given
    const image = new Images({url: "fakeurl.com"});

    // when
    image.setUrl("fakeurl2.com");

    // then
    expect(image.getUrl()).toEqual("fakeurl2.com");
});

