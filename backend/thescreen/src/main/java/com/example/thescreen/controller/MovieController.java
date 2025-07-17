package com.example.thescreen.controller;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.example.thescreen.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class MovieController {

    private final MovieRepository movieRepository;
    private final MovieService movieService;

    /**
     * ✅ 1) 모든 영화 조회 (상영 중인 영화만)
     */
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findByMovieinfo("Y");
    }

    /**
     * ✅ 2) 현재 상영작 조회 (상영 중인 영화만)
     */
    @GetMapping("/current")
    public List<Movie> getCurrentMovies() {
        LocalDate today = LocalDate.now();
        return movieRepository.findCurrentScreeningMovies(today);
    }

    /**
     * ✅ 3) 상영 예정작 조회 (상영 중인 영화만)
     */
    @GetMapping("/upcoming")
    public List<Movie> getUpcomingMovies() {
        LocalDate today = LocalDate.now();
        return movieRepository.findUpcomingScreeningMovies(today);
    }

    /**
     * ✅ 4) 관리자용 KOBIS 박스오피스 + 상세 정보 수동 저장
     */
    @PostMapping("/fetch-movies")
    public java.util.Map<String, Object> fetchMoviesFromKobis() {
        try {
            // 저장 전 영화 개수
            long beforeCount = movieRepository.count();

//            movieService.saveDailyBoxOffice();

            // 저장 후 영화 개수
            long afterCount = movieRepository.count();
            long addedCount = afterCount - beforeCount;

            // 저장 후 업데이트된 영화 목록을 반환
            LocalDate today = LocalDate.now();
            List<Movie> allMovies = movieRepository.findAll();

            // 현재 상영작: movieinfo가 'Y' 또는 'N'인 영화들
            List<Movie> currentMovies = allMovies.stream()
                    .filter(movie -> "Y".equals(movie.getMovieinfo()) || "N".equals(movie.getMovieinfo()))
                    .collect(Collectors.toList());
            // 상영 종료작: movieinfo가 'D'인 영화들
            List<Movie> archivedMovies = allMovies.stream()
                    .filter(movie -> "D".equals(movie.getMovieinfo()))
                    .collect(Collectors.toList());

            java.util.Map<String, Object> result = new java.util.HashMap<>();
            result.put("success", true);
            result.put("message", String.format("박스오피스 데이터 처리 완료! 새로 추가된 영화: %d개 (전체: %d개)",
                                               addedCount, afterCount));
            result.put("addedCount", addedCount);
            result.put("totalCount", afterCount);
            result.put("currentMovies", currentMovies);
            result.put("archivedMovies", archivedMovies);
            return result;
        } catch (Exception e) {
            java.util.Map<String, Object> result = new java.util.HashMap<>();
            result.put("success", false);
            result.put("message", "데이터 가져오기에 실패했습니다: " + e.getMessage());
            return result;
        }
    }

    /**
     * ✅ 5) 관리자용 영화 목록 조회 (현재 상영작 + 상영 종료작)
     */
    @GetMapping("/admin")
    public java.util.Map<String, List<Movie>> getMoviesForAdmin() {
        LocalDate today = LocalDate.now();
        List<Movie> allMovies = movieRepository.findAll();
        // 현재 상영작: movieinfo가 'Y' 또는 'N'인 영화들
        List<Movie> currentMovies = allMovies.stream()
                .filter(movie -> "Y".equals(movie.getMovieinfo()) || "N".equals(movie.getMovieinfo()))
                .collect(Collectors.toList());
        // 상영 종료작: movieinfo가 'D'인 영화들
        List<Movie> archivedMovies = allMovies.stream()
                .filter(movie -> "D".equals(movie.getMovieinfo()))
                .collect(Collectors.toList());

        java.util.Map<String, List<Movie>> result = new java.util.HashMap<>();
        result.put("currentMovies", currentMovies);
        result.put("archivedMovies", archivedMovies);

        return result;
    }

    /**
     * ✅ 6) 영화 정보 수정
     */
    @PutMapping("/{moviecd}")
    public Movie updateMovie(@PathVariable String moviecd, @RequestBody Movie updatedMovie) {
        Movie movie = movieRepository.findById(moviecd)
                .orElseThrow(() -> new RuntimeException("영화를 찾을 수 없습니다: " + moviecd));
        // 수정 가능한 필드들만 업데이트
        if (updatedMovie.getMovienm() != null) {
            movie.setMovienm(updatedMovie.getMovienm());
        }
        if (updatedMovie.getGenre() != null) {
            movie.setGenre(updatedMovie.getGenre());
        }
        if (updatedMovie.getRunningtime() != null) {
            movie.setRunningtime(updatedMovie.getRunningtime());
        }
        if (updatedMovie.getReleasedate() != null) {
            movie.setReleasedate(updatedMovie.getReleasedate());
        }
        if (updatedMovie.getDirector() != null) {
            movie.setDirector(updatedMovie.getDirector());
        }
        if (updatedMovie.getActors() != null) {
            movie.setActors(updatedMovie.getActors());
        }
        if (updatedMovie.getDescription() != null) {
            movie.setDescription(updatedMovie.getDescription());
        }
        if (updatedMovie.getIsadult() != null) {
            movie.setIsadult(updatedMovie.getIsadult());
        }
        return movieRepository.save(movie);
    }

    /**
     * ✅ 7) 영화 삭제
     */
    @DeleteMapping("/{moviecd}")
    public String deleteMovie(@PathVariable String moviecd) {
        if (!movieRepository.existsById(moviecd)) {
            throw new RuntimeException("영화를 찾을 수 없습니다: " + moviecd);
        }
        movieRepository.deleteById(moviecd);
        return "영화가 성공적으로 삭제되었습니다.";
    }

    /**
     * ✅ 8) 영화 상영 상태 변경
     */
    @PutMapping("/{moviecd}/screening-status")
    public Movie updateScreeningStatus(@PathVariable String moviecd) {
        Movie movie = movieRepository.findById(moviecd)
                .orElseThrow(() -> new RuntimeException("영화를 찾을 수 없습니다: " + moviecd));
        // 현재 상태의 반대로 변경
        String currentStatus = movie.getMovieinfo();
        String newStatus = "Y".equals(currentStatus) ? "N" : "Y";
        movie.setMovieinfo(newStatus);
        return movieRepository.save(movie);
    }

    /**
     * ✅ 9) 영화 상영 종료 (논리적 삭제)
     */
    @PutMapping("/{moviecd}/archive")
    public Movie archiveMovie(@PathVariable String moviecd) {
        Movie movie = movieRepository.findById(moviecd)
                .orElseThrow(() -> new RuntimeException("영화를 찾을 수 없습니다: " + moviecd));
        
        // 상영 종료 상태로 변경 (논리적 삭제)
        movie.setMovieinfo("D");
        
        return movieRepository.save(movie);
    }



    @PostMapping("/detail")
    public ResponseEntity<Optional<Movie>> getMovieDetail(@RequestBody Map<String, Object> params) {
        String moviecd = (String) params.get("movieno");
        Optional<Movie> movie = movieRepository.findById(moviecd);

        return new ResponseEntity<>(movie, HttpStatus.OK);
    }
}
