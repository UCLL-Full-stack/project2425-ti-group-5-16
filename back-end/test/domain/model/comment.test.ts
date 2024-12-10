import { Comment } from "../../../model/comment";
import { User } from "../../../model/user";
import { Setup } from "../../../model/setup";

const valid_user = new User({id: 1, name: "John Doe", email: "johndoe@gmail.com", password: "password", age: 25});

const valid_setup = new Setup({
    owner: valid_user,
    details: "This is a setup",
    image_urls: [],
    last_updated: new Date(),
    hardware_components: [],
    setup_id: 1
});

test('given: valid values, when: creating comment, then: comment is created with those values', () => {

    //initiate some variables
    const valid_user = new User({id: 1, name: "John Doe", email: "johndoe@gmail.com", password: "password", age: 25});

    const valid_setup = new Setup({
        owner: valid_user,
        details: "This is a setup",
        image_urls: [],
        last_updated: new Date(),
        hardware_components: [],
        setup_id: 1
    });
    
    // given // when
    const valid_comment = new Comment({
        comment_id: 1,
        setup_id: valid_setup.getSetupID(),
        user_id: valid_user.getId(),
        content: "This is a comment"
    });

    // then
    expect(valid_comment.getCommentID()).toEqual(1);
    expect(valid_comment.getSetupID()).toEqual(1);
    expect(valid_comment.getUserID()).toEqual(1);
    expect(valid_comment.getContent()).toEqual("This is a comment");
});

test('given: valid values, when: changing content, then: content is changed', () => {
    // Initialize the user and setup objects
    const valid_user = new User({id: 1, name: "John Doe", email: "johndoe@gmail.com", password: "password", age: 25});

    const valid_setup = new Setup({
        owner: valid_user,
        details: "This is a setup",
        image_urls: [],
        last_updated: new Date(),
        hardware_components: [],
        setup_id: 1
    });

    // Create a valid comment
    const valid_comment = new Comment({
        comment_id: 1,
        setup_id: valid_setup.getSetupID(),
        user_id: valid_user.getId(),
        content: "This is a comment"
    });

    // Change the content of the comment
    valid_comment.setContent("This is an updated comment");

    // Validate that the content has been updated
    expect(valid_comment.getContent()).toEqual("This is an updated comment");
});
