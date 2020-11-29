# momsitter-2020-1th-api-assignment

# 서버 실행

터미널에서 `npm start` 명령어로 API 서버를 시작할 수 있습니다.

# DB Schema

![https://s3.us-west-2.amazonaws.com/secure.notion-static.com/46663edd-a90f-4b60-9411-bf8d99910415/momsitter.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201129T041803Z&X-Amz-Expires=86400&X-Amz-Signature=39700b6f2875969946d64033997d04cab12710be134f696fbb716e767ce9296e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22momsitter.png%22](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/46663edd-a90f-4b60-9411-bf8d99910415/momsitter.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201129T041803Z&X-Amz-Expires=86400&X-Amz-Signature=39700b6f2875969946d64033997d04cab12710be134f696fbb716e767ce9296e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22momsitter.png%22)

1. `config/config_example.json`을 `config.json`으로 바꾼 후 본인의 환경에 맞춰 설정 파일을 수정합니다. (사전에 데이터베이스 생성 필요)
2. 터미널에서 `npx sequelize-cli db:migrate`로 DB Migration을 하면 DB 테이블이 데이터베이스에 세팅됩니다.

# API Specification

## 회원가입

- 주소 : /signup
- Method : POST
- 요청 예시

  - 시터 회원인 경우

    ```jsx
    {
      "userName": "박시터",
      "birthDate": "19980206",
      "gender": 1,    // 남자는 0, 여자는 1
      "userId": "wonderfulPark0206",
      "password": "Parak0206%^",
      "email": "wonderfulPark0206@gmail.com",
      "isParentMember": false,
      "isSitterMember": true,
      "careAgeStart": 3,
      "careAgeEnd": 5,
      "children": null,
      "description": "유아교육과를 전공중인 대학생 시터입니다! 사촌 동생들을 많이 돌본 경험이 있어서 아이랑 잘 놀아줄 수 있어요."
    }
    ```

  - 부모 회원인 경우

    ```jsx
    {
      "userName": "박부모",
      "birthDate": "19861019",
      "gender": 1,     // 남자는 0, 여자는 1
      "userId": "kimParent86",
      "password": "86!@Kim",
      "email": "kim86@gmail.com",
      "isParentMember": true,
      "isSitterMember": false,
      "careAgeStart": null,
      "careAgeEnd": null,
      "children": [
    	{
          "birthDate": "20190513",
          "gender": 0     // 남자는 0, 여자는 1
        },
        ...
      ],
      "description": "하루에 2시간 정도 한글놀이를 해 줄 수 있는 시터를 찾습니다 :)"
    }
    ```

- 응답 예시

  - 성공 시 응답 (201)

    ```jsx
    {
    	"result": "Signup success"
    }
    ```

  - 조건(7자 이상, 영문 대소문자 및 숫자, 특수기호 포함)에 맞지 않는 비밀번호인 경우 (400)

    ```jsx
    {
    	"result": "Invalid password"
    ```

  - 이미 가입된 유저인 경우 (409)

    ```jsx
    {
    	"result": "User already exists"
    }
    ```

  - 서버 에러 (500)

    ```jsx
    {
    	"result": "Server error"
    }
    ```

## 로그인

- 주소 : /signin
- Method : POST
- 요청 예시

  ```jsx
  {
    "userId": "wonderfulPark0206",
    "password": "Parak0206%^"
  }
  ```

- 응답 예시

  - 성공 시 응답 (200)

    - Header

      ```jsx
      "auth": "Bearer b82fc5f0db2cf2dcc6951dc7694c62a2c438b3b411f2ee2396a5e6e1b2fa775f"
      ```

    - Body

      ```jsx
      {
      	"result": "Signin success"
      }
      ```

  - 비밀번호가 맞지 않는 경우 (400)

    ```jsx
    {
    	"result": "Invalid password"
    }
    ```

  - 존재하지 않는 회원인 경우 (404)

    ```jsx
    {
    	"result": "User does not exist"
    }
    ```

  - 서버 에러 (500)

    ```jsx
    {
    	"result": "Server error"
    }
    ```

## 부모 회원 전환

- 주소 : /to-parent-member
- Method : PATCH
- 요청 예시

  - Header

    ```jsx
    "auth": "Bearer b82fc5f0db2cf2dcc6951dc7694c62a2c438b3b411f2ee2396a5e6e1b2fa775f"
    ```

  - Body

    ```jsx
    {
    	"children": [
    	  {
            "birthDate": "20190513",
            "gender": 0     // 남자는 0, 여자는 1
          },
          ...
        ],
    	"description": "하루에 2시간 정도 한글놀이를 해 줄 수 있는 시터를 찾습니다 :)"
    }
    ```

- 응답 예시

  - 성공 시 응답 (201)

    ```jsx
    {
    	"result": "Change success"
    }
    ```

  - 잘못된 요청인 경우 (400)

    ```jsx
    {
    	"result": "Invalid request"
    }
    ```

  - 로그인이 제대로 되지 않은 경우 (400)

    ```jsx
    {
    	"result": "Login error"
    }
    ```

  - 이미 부모 회원인 경우 (409)

    ```jsx
    {
    	"result": "Already a parent member"
    }
    ```

  - 서버 에러 (500)

    ```jsx
    {
    	"result": "Server error"
    }
    ```

## 시터 회원 전환

- 주소 : /to-sitter-member
- Method : PATCH
- 요청 예시

  - Header

    ```jsx
    "auth": "Bearer b82fc5f0db2cf2dcc6951dc7694c62a2c438b3b411f2ee2396a5e6e1b2fa775f"
    ```

  - Body

    ```jsx
    {
    	"careAgeStart": 3,
    	"careAgeEnd": 5,
    	"description": "유아교육과를 전공중인 대학생 시터입니다! 사촌 동생들을 많이 돌본 경험이 있어서 아이랑 잘 놀아줄 수 있어요."
    }
    ```

- 응답 예시

  - 성공 시 응답 (201)

    ```jsx
    {
    	"result": "Change success"
    }
    ```

  - 잘못된 요청인 경우 (400)

    ```jsx
    {
    	"result": "Invalid request"
    }
    ```

  - 로그인이 제대로 되지 않은 경우 (400)

    ```jsx
    {
    	"result": "Login error"
    }
    ```

  - 이미 시터 회원인 경우 (409)

    ```jsx
    {
    	"result": "Already a sitter member"
    }
    ```

  - 서버 에러 (500)

    ```jsx
    {
    	"result": "Server error"
    }
    ```

## 내 정보 보기

- 주소 : /get-my-info
- Method : GET
- 요청 예시

  - Header

    ```jsx
    "auth": "Bearer b82fc5f0db2cf2dcc6951dc7694c62a2c438b3b411f2ee2396a5e6e1b2fa775f"
    ```

- 응답 예시

  - 성공 시 응답 (200)

    ```jsx
    {
      "userName": "박부모",
      "birthDate": "19861019",
      "gender": 1,     // 남자는 0, 여자는 1
      "userId": "kimParent86",
      "email": "kim86@gmail.com",
      "isParentMember": true,
      "isSitterMember": false,
      "careAgeStart": null,
      "careAgeEnd": null,
      "children": [
    	{
    	  "id": 1,
    	  "parentId": 1,
          "birthDate": "20190513",
          "gender": 0     // 남자는 0, 여자는 1
        },
        ...
      ],
      "parentDesc": "하루에 2시간 정도 한글놀이를 해 줄 수 있는 시터를 찾습니다 :)",
    	"sitterDesc": null
    }
    ```

  - 잘못된 요청인 경우 (400)

    ```jsx
    {
    	"result": "Invalid request"
    }
    ```

  - 로그인이 제대로 되지 않은 경우 (400)

    ```jsx
    {
    	"result": "Login error"
    }
    ```

  - 서버 에러 (500)

    ```jsx
    {
    	"result": "Server error"
    }
    ```

## 내 정보 업데이트

- 주소 : /update-my-info
- Method : PUT
- 요청 예시

  - Header

    ```jsx
    "auth": "Bearer b82fc5f0db2cf2dcc6951dc7694c62a2c438b3b411f2ee2396a5e6e1b2fa775f"
    ```

  - Body

    - 시터 회원인 경우

      ```jsx
      {
        "userName": "박시터",
        "birthDate": "19980206",
        "gender": 1,    // 남자는 0, 여자는 1
        "userId": "wonderfulPark0206",
        "password": "Parak0206%^",
        "email": "wonderfulPark0206@gmail.com",
        "careAgeStart": 3,
        "careAgeEnd": 5,
        "children": null,
        "parentDesc": null,
        "sitterDesc": "유아교육과를 전공중인 대학생 시터입니다! 사촌 동생들을 많이 돌본 경험이 있어서 아이랑 잘 놀아줄 수 있어요."
      }
      ```

    - 부모 회원인 경우

      ```jsx
      {
        "userName": "박부모",
        "birthDate": "19861019",
        "gender": 1,     // 남자는 0, 여자는 1
        "userId": "kimParent86",
        "password": "86!@Kim",
        "email": "kim86@gmail.com",
        "careAgeStart": null,
        "careAgeEnd": null,
        "children": [
      	{
      	  "id": 1,
            "birthDate": "20190513",
            "gender": 0     // 남자는 0, 여자는 1
          },
          ...
        ],
        "parentDesc": "하루에 2시간 정도 한글놀이를 해 줄 수 있는 시터를 찾습니다 :)",
      	"sitterDesc": null
      }
      ```

- 응답 예시

  - 성공 시 응답 (201)

    ```jsx
    {
    	"result": "Update success"
    }
    ```

  - 잘못된 요청일 경우 (400)

    ```jsx
    {
    	"result": "Invalid request"
    }

    ```

  - 조건(7자 이상, 영문 대소문자 및 숫자, 특수기호 포함)에 맞지 않는 비밀번호인 경우 (400)

    ```jsx
    {
    	"result": "Invalid password"
    }
    ```

  - 로그인이 제대로 되지 않은 경우 (400)

    ```jsx
    {
    	"result": "Login error"
    }
    ```

  - 서버 에러 (500)

    ```jsx
    {
    	"result": "Server error"
    }
    ```

# 사용 라이브러리/프레임워크

- Node.js
- ExpressJS
- body-parser - HTTP Request의 Body를 Parsing하기 위한 라이브러리
- jsonwebtoken - JWT 관련 라이브러리
- mysql2 - MySQL 연동 라이브러리
- Sequelize - Node.js를 위한 ORM
