import axios from 'axios';

const baseUrl = "http://localhost:3001"

const serverController = {

    async getAllProperty (page, filter, sort) {
        if (!page) page = 1;
        // console.log(filter);
        // console.log(sort);
        // console.log(typeof(sort));
        // console.log((filter  !== "null" && sort === "null"))
        try {
            if(filter !== "null" && sort !== "null"){
                return await axios.get(baseUrl + "/api/property/?page=" + page + "&filter=" + filter + "&sort=" + sort)
            }
            else if ((filter  !== "null" && sort === "null") || (filter !== "null" && !sort)){
                return await axios.get(baseUrl + "/api/property/?page=" + page + "&filter=" + filter)
            }
            else if((filter === "null" && sort !== "null") || (sort !== "null" && !filter) ){
                return await axios.get(baseUrl + "/api/property/?page=" + page + "&sort=" + sort)
            }else{
                return await axios.get(baseUrl + "/api/property/?page=" + page)
            }
            
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async getProperty (pid) {
        try {
            return await axios.get(baseUrl + "/api/property/" + pid)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async postProperty (user, property) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        const {title, description, price, type, zipcode, bedroom, bath, date, album} = property
        const data = {
            title: title.value,
            description: description.value,
            price: parseInt(price.value),
            type:type.value,
            zipcode:zipcode.value,
            bedroom:parseInt(bedroom.value),
            bath:parseInt(bath.value),
            date:date,
            album: album
        }
        try {
            return await axios.post(baseUrl + "/api/property/", data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async editProperty (pid, user, property) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
  
        const {title, description, price, type, zipcode, bedroom, bath, date, newImages, removedImages} = property
        const data = {
            title: title.value,
            description: description.value,
            price: parseInt(price.value),
            type:type.value,
            zipcode:zipcode.value,
            bedroom:parseInt(bedroom.value),
            bath:parseInt(bath.value),
            date:date,
            newImages: newImages,
            removedImages: removedImages
        }

        try {
            return await axios.put(baseUrl + "/api/property/" + pid, data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },
    
    async deleteProperty (pid, user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        try {
            return await axios.delete(baseUrl + "/api/property/" + pid, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async postUser (user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        try {
            return await axios.post(baseUrl + "/api/user/", null, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async getUser (user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        try {
            return await axios.get(baseUrl + "/api/user/", {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async getUserId (userId) {
        try {
            return await axios.get(baseUrl + "/api/user/" + userId)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async addWatchlist (propertyId, user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        const data = {
            propertyId: propertyId
        }
        try {
            return await axios.post(baseUrl + "/api/user/watchlist", data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async removeWatchlist (propertyId, user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        try {
            return await axios.delete(baseUrl + "/api/user/watchlist/" + propertyId, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async getWatchlist (user) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        try {
            return await axios.get(baseUrl + "/api/user/watchlist", {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },

    async editUser (user, phone, avatar) {
        let token;
        try {
            token = await user.getIdToken(true)
        } catch (e) {
            throw "fail getting usertoken"
        }
        const data = {
            phone: phone,
            avatar: avatar
        }
        try {
            return await axios.patch(baseUrl + "/api/user/", data, {headers: {'Authorization': token}})
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },
	
	async addImage (imgs) {
        const data = {
            data: imgs
        }
        try {
            return await axios.post(baseUrl + "/api/image", data)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },
	
	async getImage (imgid) {
        try {
            return await axios.get(baseUrl + "/api/image/" + imgid)
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error) throw (e.response.data.error)
            else throw (e.message)
        }
    },
};
  
export default serverController;
