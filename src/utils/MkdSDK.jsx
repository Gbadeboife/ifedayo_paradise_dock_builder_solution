export default function MkdSDK() {
  // this._baseurl = "https://paradisedocklift.manaknightdigital.com";
  // this._baseurl = "https://app.paradisedocklift.com";
  // this._baseurl = "http://localhost:3048";
  this._project_id = "paralift";
  this._secret = "grljhaqkwmb6cbadsabuj6ysla302xnxi";
  //this._project_id = "manaknight";
  //this._secret = "grljhaqkwmb6cbadsabuj6ysla302xnxi";
  this.fe_baseurl = "http://localhost:3000";
  // this._baseurl = "http://localhost:3048";
  // this._baseurl = "https://paradisedocklift.mkdlabs.com";
  this._baseurl = "https://paralift.mkdlabs.com";
  // this._project_id = "paralift";
  // this._secret = "grljhaqkwmb6cbadsabuj6ysla302xnxi";
  // this._project_id = "manaknight";
  // this._secret = "grljhaqkwmb6cbadsabuj6ysla302xnxi";
  // this.fe_baseurl = "http://localhost:3000";
  // this._project_id = "localproject";
  // this._secret = "ok5pdxzobdk9so4sgke7ie9zgmyxqmpu";

  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.getItems = async (table) => {
    const result = await fetch(
      this._baseurl + `/v3/api/custom/paradisedock/${table}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode
        }
      }
    );
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.requestQuote = async (Quotebody) => {
    const result = await fetch(
      this._baseurl + `/v3/api/custom/paradisedock/quotes`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode
        },
        body: JSON.stringify(Quotebody)
      }
    );
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.login = async function (email, password, role) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode
      },
      body: JSON.stringify({
        email,
        password,
        role
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };
  this.uploadUrl = function () {
    return this._baseurl + "/v2/api/lambda/upload";
  };

  this.upload = async function (file) {
    let formData = new FormData();
    formData.append("file", file);

    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const uploadResult = await fetch(this._baseurl + `/v2/api/lambda/upload`, {
      method: "post",
      headers: header,
      body: formData
    }).then((res) => res.json());
    return uploadResult;
  };
  this.getProfile = async function () {
    const result = await fetch(this._baseurl + "/v2/api/lambda/profile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.check = async function (role) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/check", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        role
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getProfilePreference = async function () {
    const result = await fetch(this._baseurl + "/v2/api/lambda/preference", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // update email
  this.updateEmail = async function (email) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/update/email", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        email
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // update password
  this.updatePassword = async function (password) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/update/password",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          password
        })
      }
    );
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // update email
  this.updateEmailByAdmin = async function (email, id) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/admin/update/email",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          email,
          id
        })
      }
    );
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // update password
  this.updatePasswordByAdmin = async function (password, id) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/admin/update/password",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          password,
          id
        })
      }
    );
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.sendEmailVerification = function () {};
  this.updateEmailVerification = function () {};

  this.setTable = function (table) {
    this._table = table;
  };

  this.getProjectId = function () {
    return this._project_id;
  };

  this.logout = function () {
    window.localStorage.clear();
  };

  this.register = async function (email, password, role) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode
      },
      body: JSON.stringify({
        email,
        password,
        role
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.createUser = async function (email, password, role) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        email,
        password,
        role
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.forgot = async function (email) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/forgot", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode
      },
      body: JSON.stringify({
        email
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.reset = async function (token, code, password) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/reset", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode
      },
      body: JSON.stringify({
        token,
        code,
        password
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;
      case "POST":
        const insertResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonInsert = await insertResult.json();

        if (insertResult.status === 401) {
          throw new Error(jsonInsert.message);
        }

        if (insertResult.status === 403) {
          throw new Error(jsonInsert.message);
        }
        return jsonInsert;
      case "PUT":
        const updateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonUpdate = await updateResult.json();

        if (updateResult.status === 401) {
          throw new Error(jsonUpdate.message);
        }

        if (updateResult.status === 403) {
          throw new Error(jsonUpdate.message);
        }
        return jsonUpdate;

      // Part: Update Table Without Using ID
      case "PUTWHERE":
        const updateWhereRes = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload) // Note: payload: {set: {[string]: any}, where: {[string]: any}}
          }
        );
        const jsonUpdateWhereRes = await updateWhereRes.json();

        if (updateWhereRes.status === 401) {
          throw new Error(jsonUpdateWhereRes.message);
        }

        return jsonUpdateWhereRes;

      case "DELETE":
        const deleteResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonDelete = await deleteResult.json();

        if (deleteResult.status === 401) {
          throw new Error(jsonDelete.message);
        }

        if (deleteResult.status === 403) {
          throw new Error(jsonDelete.message);
        }
        return jsonDelete;
      case "DELETEALL":
        const deleteAllResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonDeleteAll = await deleteAllResult.json();

        if (deleteAllResult.status === 401) {
          throw new Error(jsonDeleteAll.message);
        }

        if (deleteAllResult.status === 403) {
          throw new Error(jsonDeleteAll.message);
        }
        return jsonDeleteAll;
      case "GETALL":
        const getAllResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonGetAll = await getAllResult.json();

        if (getAllResult.status === 401) {
          throw new Error(jsonGetAll.message);
        }

        if (getAllResult.status === 403) {
          throw new Error(jsonGetAll.message);
        }
        return jsonGetAll;
      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      case "AUTOCOMPLETE":
        const autocompleteResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload)
          }
        );
        const jsonAutocomplete = await autocompleteResult.json();

        if (autocompleteResult.status === 401) {
          throw new Error(jsonAutocomplete.message);
        }

        if (autocompleteResult.status === 403) {
          throw new Error(jsonAutocomplete.message);
        }
        return jsonAutocomplete;
      default:
        break;
    }
  };

  this.callRawAPI = async function (uri, payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const result = await fetch(this._baseurl + uri, {
      method: method,
      headers: header,
      body: JSON.stringify(payload)
    });
    const jsonResult = await result.json();

    if (result.status === 401) {
      throw new Error(jsonResult.message);
    }

    if (result.status === 403) {
      throw new Error(jsonResult.message);
    }
    return jsonResult;
  };

  // Part: Get All Data by Joining Two Columns
  this.callJoinRestAPI = async function (
    table1,
    table2,
    join_id_1,
    join_id_2,
    select,
    where,
    method,
    page,
    limit
  ) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    switch (method) {
      case "GETALL":
        const result = await fetch(
          this._baseurl + `/v1/api/join/${table1}/${table2}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify({
              join_id_1, // "tableName1"
              join_id_2, // "tableName2"
              select, // "tableName1.field1, tableName2.field2"
              where: where || "" //  where: ["status=2424", "id=1"]
            })
          }
        );
        const jsonResult = await result.json();

        if (result.status === 401) {
          throw new Error(jsonResult.message);
        }

        if (result.status === 403) {
          throw new Error(jsonResult.message);
        }
        return jsonResult;

      case "PAGINATE":
        if (!page) {
          page = 1;
        }
        if (!limit) {
          limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/join/${table1}/${table2}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify({
              join_id_1, // "tableName1"
              join_id_2, // "tableName2"
              select, // "tableName1.field1, tableName2.field2"
              where: where || "", //  where: ["status=2424", "id=1"]
              page,
              limit
            })
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;

      default:
        break;
    }
  };

  // Part: Get Data by Joining Multiple Columns with Pagination
  this.callMultiJoinRestAPI = async function (
    tables,
    joinIds,
    selectStr,
    where,
    page,
    limit,
    method
  ) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const paginateResult = await fetch(
      this._baseurl + `/v1/api/multi-join/${method}`,
      {
        method: "post",
        headers: header,
        body: JSON.stringify({
          tables, // ["tableName1", "tableName2"]
          joinIds, // ["tableName1.id", "tableName2.id"]
          selectStr, // "tableName1.field1, tableName2.field2"
          where, // ["status=2424", "id=1"]
          page,
          limit
        })
      }
    );
    const jsonPaginate = await paginateResult.json();

    if (paginateResult.status === 401) {
      throw new Error(jsonPaginate.message);
    }

    if (paginateResult.status === 403) {
      throw new Error(jsonPaginate.message);
    }
    return jsonPaginate;
  };

  this.subscribe = function (payload) {};
  this.subscribeChannel = function (channel, payload) {};
  this.subscribeListen = function (channel) {};
  this.unSubscribeChannel = function (channel, payload) {};
  this.broadcast = function (payload) {};
  this.exportCSV = function (payload) {};

  this.cmsAdd = async function (page, key, type, value) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const insertResult = await fetch(this._baseurl + `/v2/api/lambda/cms`, {
      method: "post",
      headers: header,
      body: JSON.stringify({
        page,
        key,
        type,
        value
      })
    });
    const jsonInsert = await insertResult.json();

    if (insertResult.status === 401) {
      throw new Error(jsonInsert.message);
    }

    if (insertResult.status === 403) {
      throw new Error(jsonInsert.message);
    }
    return jsonInsert;
  };

  this.cmsEdit = async function (id, page, key, type, value) {
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const updateResult = await fetch(
      this._baseurl + `/v2/api/lambda/cms/` + id,
      {
        method: "put",
        headers: header,
        body: JSON.stringify({
          page,
          key,
          type,
          value
        })
      }
    );
    const jsonInsert = await updateResult.json();

    if (updateResult.status === 401) {
      throw new Error(jsonInsert.message);
    }

    if (updateResult.status === 403) {
      throw new Error(jsonInsert.message);
    }
    return jsonInsert;
  };

  this.getToken = function () {
    return window.localStorage.getItem("token");
  };

  // get chat room
  this.getMyRoom = async function () {
    const result = await fetch(
      this._baseurl + "/v3/api/lambda/realtime/room/my",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // get chat id
  this.getChatId = async function (room_id) {
    const result = await fetch(
      this._baseurl + `/v2/api/lambda/room?room_id=${room_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // post chat
  this.getChats = async function (room_id, chat_id, date) {
    const result = await fetch(this._baseurl + `/v3/api/lambda/realtime/chat`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        room_id,
        chat_id,
        date
      })
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.restoreChat = async function (room_id) {
    await fetch(
      this._baseurl + `/v2/api/lambda/v2/api/lambda/room/poll?room=${room_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
  };

  // post a new message
  this.postMessage = async function (messageDetails) {
    const result = await fetch(this._baseurl + `/v3/api/lambda/realtime/send`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(messageDetails)
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.uploadImage = async function (file) {
    const result = await fetch(this._baseurl + `/v2/api/lambda/s3/upload`, {
      method: "post",
      headers: {
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: file
    });

    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.createRoom = async function (roomDetails) {
    const result = await fetch(this._baseurl + `/v3/api/lambda/realtime/room`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(roomDetails)
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getAllUsers = async function () {
    const result = await fetch(this._baseurl + `/v1/api/rest/user/GETALL`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  // start pooling
  this.startPooling = async function (user_id) {
    const result = await fetch(
      this._baseurl + `/v3/api/lambda/realtime/room/poll?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    const json = await result.json();

    if (result.status === 401) {
      throw new Error(json.message);
    }

    if (result.status === 403) {
      throw new Error(json.message);
    }
    return json;
  };

  /**
   * start stripe functions
   */

  this.addStripeProduct = async function (data) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/stripe/product",
      {
        method: "post",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getStripeProducts = async function (paginationParams, filterParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/products?${paginationQuery}&${filterQuery}`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getStripeProduct = async function (id) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/product/${id}`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.updateStripeProduct = async function (id, payload) {
    const header = {
      "content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/product/${id}`,
      {
        method: "put",
        headers: header,
        body: JSON.stringify(payload)
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.addStripePrice = async function (data) {
    const result = await fetch(this._baseurl + "/v2/api/lambda/stripe/price", {
      method: "post",
      headers: {
        "content-Type": "application/json",
        "x-project": base64Encode,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getStripePrices = async function (paginationParams, filterParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/prices?${paginationQuery}&${filterQuery}`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getStripePrice = async function (id) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/price/${id}`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.updateStripePrice = async function (id, payload) {
    const header = {
      "content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/price/${id}`,
      {
        method: "put",
        headers: header,
        body: JSON.stringify(payload)
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getStripeSubscriptions = async function (
    paginationParams,
    filterParams
  ) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/subscriptions?${paginationQuery}&${filterQuery}`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.adminCancelStripeSubscription = async function (subId, data) {
    const result = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/subscription/${subId}`,
      {
        method: "delete",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }

    return json;
  };

  this.adminCreateUsageCharge = async function (subId, quantity) {
    const result = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/subscription/usage-charge`,
      {
        method: "post",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          subId,
          quantity
        })
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }

    return json;
  };

  this.getStripeInvoices = async function (paginationParams, filterParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/invoices?${paginationQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };
  this.getStripeInvoicesV2 = async function (paginationParams, filterParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/invoices-v2?${paginationQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getStripeOrders = async function (paginationParams, filterParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/orders?${paginationQuery}&${filterQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  /**
   * -------------------------------------------------------
   */

  this.initCheckoutSession = async function (data) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/stripe/checkout",
      {
        method: "post",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.registerAndSubscribe = async function (data) {
    /**
     *
     * @param {object} data {email, password, cardToken, planId}
     * @returns
     */
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/stripe/customer/register-subscribe",
      {
        method: "post",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.createStripeCustomer = async function (payload) {
    const header = {
      "content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer`,
      {
        method: "post",
        headers: header,
        body: JSON.stringify(payload)
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.createCustomerStripeCard = async function (payload) {
    const header = {
      "content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer/card`,
      {
        method: "post",
        headers: header,
        body: JSON.stringify(payload)
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.createStripeSubscription = async function (data) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/stripe/customer/subscription",
      {
        method: "post",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getCustomerStripeSubscription = async function (userId) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer/subscription`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getCustomerStripeSubscriptions = async function (
    paginationParams,
    filterParams
  ) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const filterQuery = new URLSearchParams(filterParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/customer/subscriptions?${paginationQuery}&${filterQuery}`,
      {
        method: "get",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.changeStripeSubscription = async function (data) {
    const result = await fetch(
      this._baseurl + "/v2/api/lambda/stripe/customer/subscription",
      {
        method: "put",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.cancelStripeSubscription = async function (subId, data) {
    const result = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer/subscription/${subId}`,
      {
        method: "delete",
        headers: {
          "content-Type": "application/json",
          "x-project": base64Encode,
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    const json = await result.json();
    if ([401, 403, 500].includes(result.status)) {
      throw new Error(json.message);
    }
    return json;
  };

  this.getCustomerStripeDetails = async function () {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getCustomerStripeCards = async function (paginationParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer/cards?${paginationQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getCustomerStripeInvoices = async function (paginationParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/customer/invoices?${paginationQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getCustomerStripeCharges = async function (paginationParams) {
    const header = {
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/customer/charges?${paginationQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.getCustomerStripeOrders = async function (paginationParams) {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode
    };
    const paginationQuery = new URLSearchParams(paginationParams);
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/customer/orders?${paginationQuery}`,
      {
        method: "get",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.projectHealth = async function () {
    const header = {
      "x-project": base64Encode
    };

    const getResult = await fetch(
      this._baseurl + `/v3/api/custom/paradisedock/health`,
      {
        method: "GET",
        headers: header
      }
    );

    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.setStripeCustomerDefaultCard = async function (cardId) {
    const header = {
      "content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const getResult = await fetch(
      this._baseurl +
        `/v2/api/lambda/stripe/customer/card/${cardId}/set-default`,
      {
        method: "put",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  this.deleteCustomerStripeCard = async function (cardId) {
    const header = {
      "content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    const getResult = await fetch(
      this._baseurl + `/v2/api/lambda/stripe/customer/card/${cardId}`,
      {
        method: "delete",
        headers: header
      }
    );
    const jsonGet = await getResult.json();

    if ([401, 403, 500].includes(getResult.status)) {
      throw new Error(jsonGet.message);
    }

    return jsonGet;
  };

  /** end stripe functions */
  return this;
}
