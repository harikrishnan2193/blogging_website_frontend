import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"


export const registerAPI = async (users) => {
    return await commonAPI('POST', `${BASE_URL}/users/register`, users, "")
}

export const loginAPI = async (users) => {
    return await commonAPI('POST', `${BASE_URL}/users/login`, users, "")
}

export const addBlogAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${BASE_URL}/product/addnew`, reqBody, reqHeader)
}

export const getAllblogsAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/project/all-blogs`)
}

export const getUsersBlogAPI = async (userId) => {
    return await commonAPI('GET', `${BASE_URL}/project/user-blogs/${userId}`)    
}

export const updateBlogAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI('PUT', `${BASE_URL}/project/update-blog/${id}`, reqBody, reqHeader)
}

export const deleteBlogAPI = async (id, reqHeader) => {
    return await commonAPI('DELETE', `${BASE_URL}/project/delete-blog/${id}`, {}, reqHeader)
}
