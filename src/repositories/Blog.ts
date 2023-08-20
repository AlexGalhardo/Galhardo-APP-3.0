import slugify from "slugify";

import prisma from "../config/prisma";
import { createBlogDTO, updateBlogDTO } from "../utils/InputTypes";

export default class Blog {
    static getAll() {
        return prisma.blog.findMany();
    }

    static async getRandom() {
        const skip = Math.floor(Math.random() * (await prisma.blog.count()));
        return prisma.blog.findMany({
            take: 1,
            skip,
        });
    }

    static getTotal() {
        return prisma.blog.count();
    }

    static getById(blog_id: string) {
        return prisma.blog.findUnique({
            where: {
                id: blog_id,
            },
        });
    }

    static searchTitle(blogTitle: string) {
        return prisma.blog.findMany({
            where: {
                title: {
                    contains: blogTitle,
                    mode: "insensitive",
                },
            },
        });
    }

    static create(createBlog: createBlogDTO) {
        return prisma.blog.create({
            data: {
                title: createBlog.title,
                image: createBlog.image,
                category: createBlog.category,
                slug: slugify(createBlog.title),
                resume: createBlog.resume,
                body: createBlog.body,
            },
        });
    }

    static update(updateBlog: updateBlogDTO) {
        return prisma.blog.update({
            where: {
                id: updateBlog.id,
            },
            data: {
                title: updateBlog.title,
                image: updateBlog.image,
                category: updateBlog.category,
                resume: updateBlog.resume,
                body: updateBlog.body,
                updated_at: new Date(),
            },
        });
    }

    static delete(blog_id: string) {
        return prisma.blog.delete({
            where: {
                id: blog_id,
            },
        });
    }

    static getPostsByPageLimit(page: number, blogPostsPerPage: number) {
        const offset = Number(page * blogPostsPerPage - blogPostsPerPage);
        const getUntil = Number(page * blogPostsPerPage);
        return prisma.blog.findMany({
            skip: offset,
            take: getUntil,
        });
    }

    static getBySlug(slug: string) {
        return prisma.blog.findUnique({
            where: {
                slug,
            },
        });
    }
}
