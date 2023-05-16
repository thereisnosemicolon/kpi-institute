module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: String,
            email: String,
            username: Boolean,
            password: String,
            profile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "profiles"
            },
            skill: String
        },
        {
            timestamps: true
        }
    )
    schema.method("toJSON", function(){
        const {_v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const User = mongoose.model("users", schema)
    return User
}