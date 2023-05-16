module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: String,
        },
        {
            timestamps: true
        }
    );
    const Profile = mongoose.model("profiles", schema)
    return Profile
}