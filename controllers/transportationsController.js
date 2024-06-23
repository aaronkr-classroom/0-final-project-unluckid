const Transportation = require('../models/Transportation'); // Transportation 모델 불러오기

// Index: 모든 transportation 목록 보기
module.exports = {
  index: (req, res, next) => {
    Transportation.find() // index 액션에서만 쿼리 실행
      .then((transportations) => {
        // 조회된 데이터를 res.locals에 저장하여 다음 미들웨어 함수에서 사용할 수 있도록 함
        res.locals.transportations = transportations;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching transportations: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("transportations/index", {
      page: "transportations",
      title: "All transportations",
      transportations: res.locals.transportations // res.locals에 저장된 transportations를 렌더링에 전달
    });
    
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  

  new: (req, res) => {
    res.render('transportations/new',{
      page: "transportations",
      title: "All transportations",
    });
  },

  create: async (req, res) => {
    try {
      await Transportation.create(req.body); // 요청 바디를 기반으로 새로운 교통수단 생성
      res.redirect('/transportations'); // 생성 후 목록 페이지로 리다이렉트
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error'); // 서버 오류 시 500 상태코드와 함께 오류 메시지 전송
    }
  },
  

  show: (req, res, next) => {
    let transportationId = req.params.id; // request params로부터 교통수단 ID 수집
    Transportation.findById(transportationId) // ID로 교통수단 찾기
      .then((transportation) => {
        if (!transportation) {
          return res.status(404).send('Transportation not found');
        }
        res.locals.transportation = transportation; // 응답 객체를 통해 다음 미들웨어 함수로 교통수단 전달
        next();
      })
      .catch((error) => {
        console.log(`Error fetching transportation by ID: ${error.message}`);
        next(error); // 에러를 로깅하고 다음 함수로 전달
      });
  },

  showView: (req, res) => {
    res.render("transportations/show", {
      page: "transportations",
      title: res.locals.transportation.name, // 교통수단의 이름을 title로 설정
      transportation: res.locals.transportation // res.locals에 저장된 transportation을 렌더링에 전달
    });
  },

  edit: (req, res, next) => {
    let transportationId = req.params.id;
    Transportation.findById(transportationId)
      .then((transportation) => {
        if (!transportation) {
          return res.status(404).send('Transportation not found');
        }
        res.render("transportations/edit", {
          transportation: transportation,
          page: "edit-transportation",
          title: "Edit Transportation",
        });
      })
      .catch((error) => {
        console.log(`Error fetching transportation by ID: ${error.message}`);
        next(error);
      });
  },
  

  editView: (req, res) => {
    res.render("transportations/edit", {
      transportation: res.locals.transportation,
      page: "edit-transportation",
      title: "Edit Transportation",
    });
  },

  

  
  update: (req, res, next) => {
    let transportationId = req.params.id,
       transportationParams = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
    };

    Transportation.findByIdAndUpdate(transportationId, {
      $set: transportationParams
    }) 
    .then((transportation) => {
      res.locals.redirect = `/transportations/${transportationId}`;
      res.locals.transportation = transportation;
      next(); // 지역 변수로서 응답하기 위해 사용자를 추가하고 다음 미들웨어 함수 호출
    })
    .catch((error) => {
      console.log(`Error updating transportation by ID: ${error.message}`);
      next(error);
    });
  },

  delete: (req, res, next) => {
    let transportationId = req.params.id;
    Transportation.findByIdAndDelete(transportationId)
      .then(() => {
        res.locals.redirect = "/transportations";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting transportation by ID: ${error.message}`);
        next(error);
      });
  },
  

  
  
  

  showTransportation: (req, res) => {
    res.render("transportations/transportation", {
      page: "transportation",
      title: "Transportation",
    });
  }
};
