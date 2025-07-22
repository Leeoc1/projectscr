package com.example.thescreen.dto;

public class WishMovieDto {
    private String moviecd;
    private String movienm;
    private String posterurl;

    public WishMovieDto(String moviecd, String movienm, String posterurl) {
        this.moviecd = moviecd;
        this.movienm = movienm;
        this.posterurl = posterurl;
    }

    public String getMoviecd() {
        return moviecd;
    }
    public void setMoviecd(String moviecd) {
        this.moviecd = moviecd;
    }
    public String getMovienm() {
        return movienm;
    }
    public void setMovienm(String movienm) {
        this.movienm = movienm;
    }
    public String getPosterurl() {
        return posterurl;
    }
    public void setPosterurl(String posterurl) {
        this.posterurl = posterurl;
    }
}
