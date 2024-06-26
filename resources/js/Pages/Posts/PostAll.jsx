import BasicDateCalendar from "@/Components/BasicDateCalendar";
import GroupCard from "@/Components/GroupCard";
import InputLabel from "@/Components/InputLabel";
import PostCard from "@/Components/PostCard";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import TimelineCard from "@/Components/TimelineCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function PostAll({ auth, posts }) {
    const { data, setData, post, errors, reset } = useForm({
        content: "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("post.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview("");
                document.getElementById("image").value = "";
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        // Generate a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Posts" />

            <div className="flex gap-8 justify-center">
                <div className="max-w-5xl pl-8 basis-3/4 flex-1">
                    <div className="flex flex-col w-full bg-white rounded-xl shadow-sm p-6 mt-16 mb-8">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="font-semibold text-2xl text-slate-800">
                                All Posts
                            </h1>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8"
                            encType="multipart/form-data"
                        >
                            <div className="flex flex-col gap-2">
                                <InputLabel
                                    htmlFor="content"
                                    value={"Whats on your mind"}
                                />
                                <TextArea
                                    className="w-full"
                                    id="content"
                                    name="content"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <TextInput
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="image"
                                    id="lb-image"
                                    className="cursor-pointer"
                                >
                                    <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </label>
                                <PrimaryButton>Post</PrimaryButton>
                            </div>
                        </form>
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Image preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "300px",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-6">
                        {posts &&
                            posts.map((post) => (
                                <PostCard
                                    key={post?.id}
                                    id={post?.id}
                                    username={post?.user.name}
                                    body={post?.content}
                                    updated_at={post?.formatted_updated_at}
                                    image_path={post?.image_path}
                                    picture={post?.user.picture}
                                    isLiked={post?.is_liked}
                                    likesCount={post?.likes_count}
                                />
                            ))}
                    </div>
                </div>
                <div className="w-full basis-1/4 pr-8 mt-8">
                    <BasicDateCalendar />
                    <TimelineCard />
                    <TimelineCard />
                    <TimelineCard />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
