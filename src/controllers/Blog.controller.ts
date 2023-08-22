import { Request, Response } from "express";
import pagination from "pagination";

import Header from "../utils/Header";
import Blog from "../repositories/Blog.repository";

export default class BlogController {
	static async getViewBlog(req: Request, res: Response) {
		const totalBlogPosts = await Blog.getTotal();
		const blogPostsPerPage = 4;

		let { page } = req.params;

		if (!page) {
			page = 1;
		}

		const blog = await Blog.getPostsByPageLimit(page, blogPostsPerPage);

		res.render("pages.blog/blog", {
			blog,
			user: global.SESSION_USER,
			blog_active: true,
			boostrapPaginator: BlogController.getRenderBootstrapPaginator(page, blogPostsPerPage, totalBlogPosts),
			header: Header.blog(),
		});
	}

	static async getSearchBlogTitle(req: Request, res: Response) {
		const blogPosts = await Blog.getAll();
		const searchBlogTitle = req.query.blogTitle;

		if (!searchBlogTitle) {
			return res.redirect("/blog");
		}

		const blogTitlesSearched = blogPosts.filter(
			(blogPost) => blogPost.title.toLowerCase().indexOf(searchBlogTitle.toLowerCase()) > -1,
		);

		const totalBlogPostsFoundFromSearch = blogTitlesSearched.length;

		return res.render("pages.blog/blog", {
			blog: blogTitlesSearched,
			searchBlogTitle,
			totalBlogPostsFoundFromSearch,
			header: Header.blog(),
		});
	}

	static async getViewBlogPost(req: Request, res: Response) {
		const { slug } = req.params;

		const blogPost = await Blog.getBySlug(slug);

		res.render("pages.blog/blogPost", {
			user: global.SESSION_USER,
			blogPost,
			header: Header.blogPost(blogPost.title),
		});
	}

	static getRenderBootstrapPaginator(current, blogPostsPerPage, totalBlogPosts) {
		return new pagination.TemplatePaginator({
			prelink: "/blog/",
			current,
			rowsPerPage: blogPostsPerPage,
			totalResult: totalBlogPosts,
			slashSeparator: true,
			template(result) {
				let i;
				let len;
				let html = '<div><ul class="pagination">';
				if (result.pageCount < 2) {
					html += "</ul></div>";
					return html;
				}
				const prelink = this.preparePreLink(result.prelink);
				if (result.previous) {
					html += `<li class="page-item"><a class="page-link" href="${prelink}${result.previous
						}">${this.options.translator("PREVIOUS")}</a></li>`;
				}
				if (result.range.length) {
					for (i = 0, len = result.range.length; i < len; i++) {
						if (result.range[i] === result.current) {
							html += `<li class="active page-item"><a class="page-link" href="${prelink}${result.range[i]}">${result.range[i]}</a></li>`;
						} else {
							html += `<li class="page-item"><a class="page-link" href="${prelink}${result.range[i]}">${result.range[i]}</a></li>`;
						}
					}
				}
				if (result.next) {
					html += `<li class="page-item"><a class="page-link" href="${prelink}${result.next
						}" class="paginator-next">${this.options.translator("NEXT")}</a></li>`;
				}
				html += "</ul></div>";
				return html;
			},
		}).render();
	}
}
