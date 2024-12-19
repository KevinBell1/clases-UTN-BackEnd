const postPingController = (req, res)=> {
    console.log('consulta recibida en /ping de tipo host Body: ',req.body)
    res.json({status: 200, message: 'pong', ok: true})
}

export default postPingController